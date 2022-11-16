Introduction
Before You Begin
The Pantheon next-wordpress-starter uses Next.js and has been tested using nodejs v16 with npm v8.

Why Use The Next.js WordPress Starter?
The next-wordpress-starter is designed as a starting point to for a Next.js site that consumes data from a WordPress backend - specifically a WordPress backend configured with the pantheon-decoupled and wp-graphql plugins installed.

The starter has a dependency on the @pantheon-systems/wordpress-kit, which includes some helpers that maximize any available features of the WordPress backend.

Creating A New Project With The Template
There are two methods to creating a new project based on the next-wordpress-starter:

Clone the starter repo directly
Use create-next-app
To clone the starter directly from GitHub, Visit the repo link https://github.com/pantheon-systems/next-wordpress-starter and click on the Code button to open the clone dropdown and select your preferred method.

To create a new project using create-next-app:

npx create-next-app -e https://github.com/pantheon-systems/next-wordpress-starter --use-npm


create-next-app uses the yarn package manager by default. Omit the --use-npm flag to use yarn, or keep it to use npm.

Next Steps
See the rest of the Next.js + WordPress documentation for more information on setting environment variables and customizing your new project!

Setting Environment Variables
Local Development
In order to fetch data from the WordPress instance, Next.js needs to know the endpoint at build time. For local development, the starter kit uses dotenv.

When you clone your decoupled frontend repo, create a .env.development.local file. In this file, update the WPGRAPHQL_URL and IMAGE_DOMAIN with your WordPress GraphQL endpoint, and the IMAGE_DOMAIN. If the WPGRAPHQL_URL and IMAGE_DOMAIN are the same, you can omit setting the IMAGE_DOMAIN.

For example:

WPGRAPHQL_URL=https://my-wordpress-site.pantheon.site/wp/graphql
IMAGE_DOMAIN=my-image-cdn.site

Your First Next.js & WordPress Customization
Before You Begin
This guide assumes the reader has working knowledge of React, and little to no knowledge of Next.js.

Data Fetching in Next.js
Next.js offers various ways to fetch data and render content. Please see the Next.js Data Fetching Overview for an in depth look at each. For the purposes of this guide, we will cover creating a page with Server Side Rendering (SSR) and Static Site Generation (SSG).

IF YOU'RE NOT SURE WHEN TO USE SSR VS SSG, CHECK OUT THESE ARTICLES:
When Should I Use getServerSideProps and When Should I Use getStaticProps

Fetching WordPress Content with @pantheon-systems/wordpress-kit
The next-wordpress-starter has a dependency on @pantheon-systems/wordpress-kit, which contains a GraphQL client to help us fetch data from WordPress. Be sure to use as few instances of the client as possible. Here is an example of how to use the client:

lib/wordpress-client.js
import { GraphqlClientFactory } from '@pantheon-systems/wordpress-kit';

// you may need to expose this variable in your next.config.js
// see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
const myWordPressGraphQLEndpoint = process.env.WPGRAPHQL_URL;

export const client = new GraphqlClientFactory(
    myWordPressGraphQLEndpoint,
).create();

The client factory takes in a your WordPress GraphQL endpoint. From here, you can use the client to make GraphQL requests to your WordPress instance.

In the next section, we will cover how to fetch data from WordPress using the client.

Using the WordPress GraphiQL IDE
To build your GraphQL queries, the WPGraphQL plugin in your WordPress instance includes a helpful GraphiQL IDE which is very helpful for crafting queries.

To open the IDE:

Login to your WordPress instance admin dashboard
In the menu on the left, there should be a GraphQL logo second from the bottom. Click this to open the IDE
SSR Example
To render a page with Server Side Rendering (SSR) in Next.js, export an async function called getServerSideProps from that page. Inside of this function, we can use the GraphQL client to fetch data from WordPress and pass it to the component as props.

pages/articles/index.js
// Import the WordPress GraphQL client we made in the last section and the gql template tag
// helper convenience function that is re-exported in the wordpress-kit from 'graphql-request'
import { client } from './lib/wordpress-client';
import { gql } from '@pantheon-systems/wordpress-kit';

export default function Posts({ posts }) {
    return <pre>{JSON.stringify(posts, null, 4)}</pre>;
}

export async function getServerSideProps(context) {
    // Use the query that was built in the GraphiQL IDE
    // This query fetches the last 10 posts and the featured image from WordPress
    const query = gql`
        query LatestPostsQuery {
            posts(first: 10) {
                edges {
                    node {
                        id
                        uri
                        title
                        featuredImage {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    const { posts } = await client.request(query);

    return {
        props: {
            posts,
        },
    };
}


SSG Example
If we want to use SSG, export getStaticProps from a page to generate that page at build time instead of request time.

Let's build a page using getStaticProps that lists recipes from our Drupal instance.

pages/pages/index.js
// Import the WordPress GraphQL client we made in the last section and the gql template tag
// helper convenience function that is re-exported in the wordpress-kit from 'graphql-request'
import { client } from '../../lib/wordpress-client';
import { gql } from '@pantheon-systems/wordpress-kit';

export default function Pages({ pages }) {
    return <pre>{JSON.stringify(pages, null, 4)}</pre>;
}

export async function getStaticProps(context) {
    // Use the query that was built in the GraphiQL IDE
    // This query fetches all pages from WordPress
    const query = gql`
        query AllPages {
            pages {
                edges {
                    node {
                        id
                        uri
                    }
                }
            }
        }
    `;

    const { pages } = await client.request(query);

    return {
        props: {
            pages,
        },
    };
}


Notice the key difference for this page–besides the fact we are fetching pages instead of posts–is the use of getStaticProps instead of getServerSideProps.

Next Steps
From here, it's time to see the code in action. Start the app if it's not already running and head to http://localhost:3000/posts. You should see the SSR'd Articles page. Check http://localhost:3000/pages to see the SSG'd Pages page.

From this point, you may want to adjust the markup and style of the Articles and Recipes components, or move on to another custom page. For more information on composing react components, see Composing Components

Conclusion
In this guide we created a new page using SSR and SSG utilizing the @pantheon-systems/wordpress-kit and the GraphiQL IDE in our WordPress instance to craft a query and fetch the data.

Setting Cache-Control Headers
Before You Begin
This guide explains the how to set Cache-Control headers using @pantheon-systems/wordpress-kit in the next-wordpress-starter, or any Next.js application using the wordpress-kit.

Setting Cache-Control Headers with WordPress Kit
The @pantheon-systems/wordpress-kit npm package exports a function, setEdgeHeaders, which takes in a response object and a cache-control header value. The value is then set to the response object's headers so that when the request is sent along it will be cached at the edge.

The default cache-control header is the following:

Cache-Control: public, s-maxage=10, stale-while-revalidate=600

To override the default, you may pass in your own cache-control header:

pages/example/index.js
import { setEdgeHeaders } from '@pantheon-systems/wordpress-kit';

export default function MyPage(props) {
    // Page component here...
}

export async function getServerSideProps(context) {
    // the response object from the server context
    const { res } = context;

    // setEdgeHeaders accepts an optional string which is a cache-control header
    const myCacheControlHeader = 'public, max-age=604800, must-revalidate';

    // Call setEdgeHeaders with the res object and your desired cache-control header
    setEdgeHeaders({ res, cacheControl: myCacheControlHeader });

    // Fetch data and return props...
}

In Production
Depending on where you deploy, these headers may or may not be respected with regards to caching at the edge. See your platform's documentation to verify.

Troubleshooting
Before You Begin
This document is meant to aid when troubleshooting common issues that arise when using the @pantheon-systems/next-wordpress-starter. For additional troubleshooting information related to the Pantheon platform, see Pantheon Front-End Sites Frequently Asked Questions.

Images Are Not Working
Local Development:

Check that the IMAGE_DOMAIN environment variable is set in the .env.development.local file.
Ensure the IMAGE_DOMAIN environment only contains the hostname. For example:
  IMAGE_DOMAIN=example.com

Ensure that you are using the next/image component and that you set the src by constructing the IMAGE_DOMAIN and the image source. For example:
```jsx
// in the starter kit, the IMAGE_URL is available
// as a constant which is exported from lib/constants.js
import { IMAGE_URL } from '../../lib/constants';
import Image from 'next/image';
const MyPage = (props) => {
  // ensure the sourceUrl is a relative path, not an absolute URL
  // because we will append this to the IMAGE_URL
  const sourceUrl = props.url;
  const altText = props.alt;
  return (
    <>
      <Image
        src={IMAGE_URL + sourceUrl}
        alt={altText}
        // remaining Image props...
      />
    </>
  );
};
```

See The docs on the next/image component for more information.
Trouble Fetching Data From WordPress
Ensure the WPGRAQPHQL_URL environment variable is set and contains the correct endpoint
Ensure the WP GraphQL plugin is activated on WordPress


