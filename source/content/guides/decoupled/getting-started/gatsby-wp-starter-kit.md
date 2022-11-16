Introduction
Before You Begin
The Pantheon gatsby-wordpress-starter uses Gatsby v4 and has been tested using nodejs v16 with npm v8. You may want to install the gatsby cli globally, or use npx

Why Use The Gatsby WordPress Starter?
The gatsby-wordpress-starter is designed as a starting point to for a Gatsby site that consumes data from a WordPress backend - specifically a WordPress backend configured with the pantheon-decoupled and wp-graphql plugins installed.

The starter has a dependency on the @pantheon-systems/wordpress-kit, which includes some helpers that maximize any available features of the WordPress backend.

Creating A New Project With The Template
There are two methods to creating a new project based on the gatsby-wordpress-starter:`

Clone the starter repo directly
Use the gatsby-cli
To clone the starter directly from GitHub, Visit the repo link https://github.com/pantheon-systems/gatsby-wordpress-starter and click on the Code button to open the clone dropdown and select your preferred method.

To create a new project using the gatsby-wordpress-starter as a template, use the gatsby new command.

# if gatsby-cli is installed locally...
gatsby new my-gatsby-wordpress-starter https://github.com/pantheon-systems/gatsby-wordpress-starter
# or use npx
npx gatsby new my-gatsby-wordpress-starter https://github.com/pantheon-systems/gatsby-wordpress-starter


If you have a package manager preference between npm and yarn, you may need to set it in the gatsby-cli options before initiating your new project.

# set your preferred package manager with the following command
# for npm
gatsby options set pm npm
# for yarn
gatsby options set pm yarn

Next Steps
See the rest of the Gatsby WordPress documentation for more information on setting environment variables and customizing your new project!

Setting Environment Variables
Local Development
In order to fetch data from the WordPress instance, Gatsby needs to know the endpoint at build time. For local development, the starter kit uses dotenv.

After creating a new project with the gatsby-wordpress-starter, create a .env.development.local file at the root of the project directory. In this file, add a WPGRAPHQL_URL key with your WordPress GraphQL Endpoint as the value.

For example:

WPGRAPHQL_URL=https://my-wordpress-site.pantheon.site/wp/graphql

Your First WordPress Customization
Before You Begin
This guide assumes the reader has working knowledge of React, little to no knowledge of Gatsby.

Gatsby's GraphQL Layer
The gatsby-source-wordpress plugin makes use of the WPGraphQL WordPress plugin in order to efficiently cache WordPress data in Gatsby. This plugin is configured to successfully source data out of the box. To do so, provide your GraphQL Endpoint in .env.local as WPGRAPHQL_URL. For example:

WPGRAPHQL_URL=https://dev-my-wordpress-site.pantheon.site/wp/graphql

Starting the app in develop mode will fetch all the data from your WordPress instance and make it available to Gatsby's GraphQL IDE. By default this is available at http://localhost:8000/___graphql.

Use this GraphQL IDE to construct queries to be used for page queries, static queries or createPages

See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/ for an in depth look at Gatsby's GraphQL Data Layer.

Sourcing Data From WordPress
Let's build a few queries together to use for some new pages. The index page will display the last 5 posts. Each post page will display the post as well as any comments that belong to that post.

There will be two queries, plus an additional query to use with Gatsby's createPages utility. One query is for the index page, and the other is for the individual blog posts.

Index Page Query
For the index page we want to limit the data to the last 5 blog posts in descending order. If you're familiar with GraphiQL IDEs, feel free to type in the fields in the middle pane instead of selecting them from the Explorer pane.

Start your Gatsby app with the WPGRAPHQL_URL environment variable set
Navigate to the GraphiQL IDE at http://localhost:8000/___graphql
From the Explorer pane on the left side of the page, select allWpPost.
Add the limit variable and set it to 5.
Under limit, select sort > fields and then from the dropdown select date. You may type 'date' while the dropdown is open to help select it.
Set order to DESC
Select allWpPost > nodes. Select title, uri, and date.
Select allWpPost > author > nodes, and select name
Our query should look like this:

query IndexPage {
    allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
        nodes {
            id
            title
            date
            uri
            author {
                node {
                    name
                }
            }
        }
    }
}

Now you may test the query in the editor with the play button at the top. Results will be displayed in the pane to the right. Copy the ID of a post to help test the next section.

Individual Post Query
For the individual pages, we will want some more detail. We will have the post id available to us via pageContext which we can use to get more info on the individual post.

Start your Gatsby app with the WPGRAPHQL_URL environment variable set
Navigate to the GraphiQL IDE at http://localhost:8000/___graphql
Open the Query Variables pane on the bottom of the page.
Set a variable id equal to the ID you noted down from the last section. For example:
{
  "id": "cG9zdDo0Mw=="
}

From the Explorer pane on the left side of the page, select wpPost.
Select wpPost > id > eq:. Click the $ to insert the variable into the query. You may need to rename the variable or edit the query manually. At this point you should have the following:
query PostWithCommentsById($id: String!) {
  wpPost(id: {eq: $id}) {

  }
}

Select wpPost > content, and date > formatString input `"MM/YY"
Select wpPost > author > node, and select name
Select wpPost > comments > nodes. Select content, title, date > formatString input "MM/YY hh:mmA". Also select author > node > name
The query should look like the following:

query PostWithCommentsById($id: String!) {
    wpPost(id: { eq: $id }) {
        author {
            node {
                name
            }
        }
        comments {
            nodes {
                author {
                    node {
                        name
                    }
                }
                content
                date(formatString: "MM/YY hh:mmA")
            }
        }
        title
        content
        date(formatString: "MM/YY")
    }
}

Consuming the Data in Gatsby
Now we should have two queries, IndexPage, and PostWithCommentsById. We'll need one more short query for the createPages API. It will be included in the next section.

INFO
Gatsby's GraphiQL IDE's Code Exporter tab generates code snippets based on the current query in the editor pane. Choose from Page Query, StaticQuery hook, StaticQuery, and createPages.

Creating Templates
Part of creating pages with Gatsby involves specifying a template. In this section, we'll use the queries we created to create a template for the index page and the individual posts.

In your Gatsby project, create a new file in the src/templates directory called last-five-post.js
To keep things simple, we'll use the Code Exporter tab from the GraphiQL IDE. Select Page query from the dropdown menu and copy the code into last-five-post.js.
Routing with createPages
We'll need to construct one more short query in order to tell Gatsby to generate pages at certain paths. Notice that this query is a stripped down version of the previous query, because all we need is the slug.

Here is an example of the createPages code which can be added to gatsby-node.js and the pages will be fetched and created at build time. We want the uri as the slug for our new page, and the id to pass into our Page Query.

gatsby-node.js
const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
                nodes {
                    id
                    uri
                }
            }
        }
    `);
    const indexTemplatePath = path.resolve(`./src/templates/last-five-post.js`);

    result.data.allWpPost.nodes.forEach((node) => {
        createPage({
            path: node.uri,
            component: indexTemplatePath,
            // The context is passed as props to the component as well
            // as into the component's GraphQL query.
            context: {
                id: node.id,
            },
        });
    });
};

We've edited the code from the Code Exporter tab slightly.

Pointed the templatePath to our template from the previous step
Passed node.uri to the path property of createPage
Passed node.id to the context of createPage
This code should generate 5 pages, one for each of the last 5 blog posts. Now inside of our template, we can use the query we created

For more information on Gatsby's createPage, see the API reference and Creating Pages in gatsby-node.js

Next, we will create our index page in the next section with a different routing technique.

Index Page
For pages that don't need to be dynamically created, we can define routes in src/pages. See Define routes in src/pages for more information.

All we need for this page is a component and our index page query. We will use the Page Query from the Code Exporter tab.

Create a new file in src/pages called last-five.js
Paste in the component from the Code Exporter tab
The file should like like this:

src/pages/last-five.js
import React from 'react';
import { graphql } from 'gatsby';

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

export const query = graphql`
    {
        allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
            nodes {
                id
                title
                date
                uri
                author {
                    node {
                        name
                    }
                }
            }
        }
    }
`;

export default ComponentName;

That's all for this page. Check out the next section to see how everything works together.

Next Steps
From here, it's time to see the code in action. Start the app if it's not already running and head to http://localhost:8000/last-five. You should see your last-five.js page rendered with the data from the Page query.

Now navigate to http://localhost:8000/{uri of one of your posts}. (You should be able to see the post uris on the /last-five route, or check your GraphiQL IDE.) The last-five-post.js template should be rendered there.

From here you should be able to query Gatsby's GraphQL layer to get the data you need right where you need it.

Conclusion
In this guide, we walked through the following:

Built GraphQL queries in Gatsby's GraphiQL IDE
Created page templates
Sourced data from WordPress for use in a Gatsby application
Dynamically created new routes based on GraphQL queries

Setting Path Prefix For Testing Locally
Before You Begin
This guide assumes you are testing a Gatsby + WordPress site locally which is to be hosted at a subpath of the root, for example /docs, by using Gatsby's pathPrefix feature.

Setting The Path Prefix
See Gatsby's guide on Adding a Path Prefix for information on setting the pathPrefix if you are not using the starter kit.

If you are using the @pantheon-systems/gatsby-wordpress-starter, the environment variable process.env.PANTHEON_UPLOAD_PATH will be automatically set as the pathPrefix in the gatsby-config.js. To test this locally, set the PANTHEON_UPLOAD_PATH in your .env.development.local to the path you would like to test.

Updating The Build Command
In order to serve your site at the given path, the build and serve commands will need an extra flag, --prefix-paths. For example, here is the package.json scripts after updating the commands with the flag:

    "scripts": {
        "build": "gatsby build --prefix-paths",
        "serve": "gatsby serve --prefix-paths"
    }

You may also set the PREFIX_PATHS environment variable before your build, for example:

PREFIX_PATHS=true gatsby build

Verify Links And Assets
If you are adding the pathPrefix to an app that did not previously use it, you may need to refactor some in app links. Verify all assets and links are still working. See Gatsby's guide on in-app linking for more information. The starter kit should work with or without a pathPrefix out of the box.

