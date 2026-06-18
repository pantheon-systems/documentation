---
contenttype: [partial]
categories: []
cms: [drupal,wordpress]
product: [front-end]
integration: []
tags: [--]
reviewed: ""
---

## Robots.txt File

A `robots.txt` file instructs search engine crawlers on which URLs and files can be accessed on your domain. This allows you to prevent crawling and indexing to specified areas of your website.

## Add a robots.txt file to a Next.js Project

You can add a `robots.txt` file to your Front-End Sites project using the Next.js static file serving feature. The steps below are intended as a guide to help you get started. Refer to [Next.js Crawling and Indexing documentation](https://nextjs.org/learn/seo/crawling-and-indexing/robots-txt) for more information.

1. Navigate to your root directory and then open the `public` folder.

1. Create a file named `robots.txt` and specify which URLs you want to block or allow crawler access to. For example:

    ```txt
    //robots.txt

    # Block crawler access
    User-agent: *
    Disallow: /billing

    User-agent: *
    Disallow: /user-profile/

    # Allow crawler access
    User-agent: *
    Allow: /home

    User-agent: *
    Allow: /products

    ```