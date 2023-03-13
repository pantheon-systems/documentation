---
title: Pantheon Front-End Sites Packages
subtitle: drupal-kit
description: Learn about drupal-kit packages.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/packages/drupal-kit
anchorid: drupal-kit
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

## Installation

To install this package to use in your application:

```
npm install @pantheon-systems/drupal-kit
```

## Usage

Modules can be imported from the `pantheon-systems/drupal-kit` package. For example, to use Drupal State to source data from your CMS backend:

### DrupalState

1. Import DrupalState in your JavaScript application:

    ```js
    import { DrupalState } from ' pantheon-systems/drupal-kit';
    ```

1. Create an instance of the store and specify the root of your API:

    ```js
    const store = new DrupalState({
        apiBase: 'https://dev-ds-demo.pantheonsite.io',
    });
    ```

1. Get a collection of objects:

    ```js
    const recipesFromApi = await store.getObject({ objectName: 'node--recipe' });
    ```

1. Get a single object:

    ```js
    const recipeFromStore = await store.getObject({
        objectName: 'node--recipe',
        id: '33386d32-a87c-44b9-b66b-3dd0bfc38dca',
    });

    ```

For more information, consult the full [Drupal State documentation
API Reference](https://project.pages.drupalcode.org/drupal_state).

## Classes

- [DrupalState](https://decoupledkit.pantheon.io/docs/Packages/drupal-kit/classes/DrupalState)

## Interfaces

- [authInit](https://decoupledkit.pantheon.io/docs/Packages/drupal-kit/interfaces/authInit)

## Functions

**defaultFetch** `apiUrl`, `requestInit?`, `res?`, `cacheControl?): Promise<Response>`

fetch data from a JSON:API endpoint, bubbling up surrogate keys if possible

### Parameters

| Name         | Type                                           | Default value            | Description                                                                         |
|--------------|------------------------------------------------|--------------------------|-------------------------------------------------------------------------------------|
| `apiUrl`       | `RequestInfo`                                    | `undefined`                | the api url for the JSON:API endpoint                                               |
| `requestInit`  | `RequestInit`                                    | `{} `                      | fetch initialization object                                                         |
| `res?`         | `boolean`  |  `ServerResponse < IncomingMessage>` | `undefined`                | response object                                                                     |
| `cacheControl` | `string`                                         | `defaultCacheControlValue` | optional value to override cache control header, defaults to 'public, s-maxage=600' |

### Returns

`Promise<Response>`

a promise containing the data for the JSON:API response

Defined in: [drupal-kit/src/lib/defaultFetch.ts:17](https://github.com/pantheon-systems/decoupled-kit-js/blob/b8ccc359/packages/drupal-kit/src/lib/defaultFetch.ts#L17)

## setSurrogateKeyHeader

**setSurrogateKeyHeader**(`keys`, `res`): `string` | `void`

Adds an aggregated list of surrogate keys in the working response.

### Parameters
|Name|	Type|	Description|
|------|-------|---------------|
|`keys`|`null`  `string` |	Value for surrogate-key header in API response.|
|`res`|	`ServerResponse<IncomingMessage>`	|The active http.ServerResponse object.|

### Returns

`string` | `void`

The current known unique set of surrogate keys.

Defined in: cms-kit/dist/src/utils/setSurrogateKeyHeader.d.ts:8
