---
title: The WordPress API
description: Unlock the power of your WordPress site with the built-in REST API
contributors: [alexfornuto]
---

The [WordPress REST API](https://developer.wordpress.org/rest-api/) is built in to every WordPress site. It allows you to build new ways of interacting with your Site, from external tools to custom front-ends. For some users, this may be the first API they've interacted with.

This doc is written with the new API user in mind. It covers the tools and functions made available by the API, and includes some example API requests.

## Before You Begin

For this docs we assume you have:

- [A WordPress site](/create-sites)
- A 'nix-like terminal environment for testing. MacOS users can use the Terminal app, and Windows 10 users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- [curl](https://curl.haxx.se/) and [Python](https://www.python.org/)

<Alert title="Exports" type="export">

This doc uses several command line example commands. So that you can copy and paste these commands to work for your use case, set the environment variable `site` in your terminal environment:

```{promptUsers: user}
export site="https://myawesomesite.io"
```

</Alert>

## How to Use an API

If you've never used an **API** (**A**pplication **P**rogramming **I**nterface) before, the idea can seem daunting. Most API reference documentation assumes a working knowledge of how to interact with an API, and only provides reference data on the functions of that particular API.

The WordPress API is a [REST](https://restfulapi.net/) API, which refers to the architectural style it's built with. We'll be interacting with the API by making calls to it over HTTP(S), using the CLI tools [curl](https://curl.haxx.se/) and the [Python JSON encoder](https://docs.python.org/3/library/json.html)

## Your First API Call

To begin, let's take a look at the data we can get from our WordPress API.

1. In your terminal environment, use `curl` to get the posts from your site:

   ```{promptUsers: user}
   curl $site/wp-json/wp/v2/posts
   ```

   What was returned returned looks like a huge wall of data. Because the API expects to be used by other programs and not humans, it doesn't format the data to be human-readable. That's where the Python JSON tool comes in.

1. Run the API call again, but this time pass it through the Python JSON tool:

   ```{promptUsers: user}
   curl $site/wp-json/wp/v2/posts | python -m json.tool
   ```

   It's still a huge amount of data, but this time it should at least be formatted for human eyes. Still, the terminal environment is not the best way to look at JSON data.

1. This time, pipe the reponse from the API into a new file:

   ```{promptUsers: user}
   curl $site/wp-json/wp/v2/posts > postsData.json
   ```

1. If you open that file in your favorite text editor, it's still a wall of text. But if you copy it into a JSON viewer (like [jsonlint.com](https://jsonlint.com/)), you can start to look at the data available to use.

## WordPress API Objects

<WordPressAPIRef object="posts"/>

### Example

<WordPressAPIRef object="blocks"/>

### Example

<WordPressAPIRef object="categories"/>

### Example

<WordPressAPIRef object="tags"/>

### Example
