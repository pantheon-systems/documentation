---
title: Edge Integrations
subtitle: Drupal SDK
description: Install, configure, and use Edge Integrations with Drupal.
categories: [develop]
tags: [collaborate, composer, continuous-integrations, webops, workflow]
contributors: [michellecolon-pantheon, jazzsequence, jspellman814, robloach, enotick]
type: guide
layout: guide
showtoc: true
anchorid: drupal-sdk
permalink: docs/guides/edge-integrations/drupal-sdk/
editpath: edge-integrations/03-drupal-sdk.md
reviewed: "2021-03-23"
---

The Edge Integrations personalization system for Drupal consists of two main parts:

- Pantheon Edge Integrations library - a CMS-agnostic PHP library that allows reading, process, and set vary headers to be recognized by Pantheon Advanced Global CDN.

- A collection of Drupal 8+ modules in the [Edge Integrations Drupal SDK](https://github.com/pantheon-systems/edge-integrations-drupal-sdk) ecosystem that provide Smart Personalization blocks and preview functionality. If you decide to forgo using the SDK, installing the [Smart Content CDN module](https://github.com/pantheon-systems/smart_content_cdn) will give you everything you need to get up and running with personalization.

## Before You Begin

<Partial file="before-you-begin-config.md" />

1. Ensure you have a working Drupal 8+ installation ready.

1. Install the necessary modules and dependencies, which can be pulled with [Composer](https://getcomposer.org/). As noted above, this can be achieved either by using the Edge Integrations Drupal SDK, or the Smart Content CDN module.

    Drupal SDK: 

    ```
    composer require pantheon-systems/edge-integrations-drupal-sdk
    ```

    Smart Content CDN module:

    ```
    composer require pantheon-systems/smart_content_cdn
    ```

1. [Smart Content Preview](https://www.drupal.org/project/smart_content_preview) is an optional package to preview your personalized content. This can also be installed with Composer:
    ```
    composer require drupal/smart_content_preview
    ```

## Configure Smart Content CDN

1. Enable the Smart Content module.

1. Enable the Smart Content CDN and Smart Content Block modules.

1. Enable the Smart Content Preview module.

1. Navigate to the **Configuration > System > Smart Content CDN Configuration** page at `/admin/config/system/smart-content-cdn`.

1. Enable the Vary Header toggle.

1. Set default Geo value to a 2-letter country code in all uppercase (e.g. US). This should match the default segment in Step 8 of the [Geolocation](/guides/edge-integrations/drupal-sdk/#geolocation) section.

1. Save the configuration.

## Smart Content CDN Usage

There are a few different ways to use Smart Content CDN. In this doc, we will cover targeting via Geolocation, and Interest via Taxonomy.

### Configure Geolocation Segments

1. Navigate to `/admin/structure/smart_content_segment_set`.

1. Click **+Add Global Segment Set**.
    ![Segment Set entities](../../../images/guides/edge-integrations/segementsetentities.png)

1. Provide a label (e.g. Geo).

1. Click **Add Segment**.
    ![Add Segment](../../../images/guides/edge-integrations/setsegment.png)

1. Change the segment name to something meaningful (e.g. Canada, US, etc).

1. Select **Geo** condition under the Smart CDN category.
    ![Select Geo](../../../images/guides/edge-integrations/selectgeo.png)

1. Click **Add Condition**.

1. Fill in value for **Equals**. Fastly is currently set up to return 2-letter country codes for geolocation. If your country is USA, type in “US” in all uppercase letters.
    ![Segment Equals](../../../images/guides/edge-integrations/segmentequals.png)

1. Add all of the required segments and select one that will act as the default.

1. Make sure that Preview checkboxes are unchecked.

1. Click **Save**.

1. Navigate to **Structure > Block layout > Add custom block** at `/block/add`.

1. Add content blocks for each segment. For instance "Hello Canada!", "Hello US!", etc.

1. Navigate to the **Block Layout** section of the site at `/admin/structure/block`.

1. Click **Place block** in the region you want the geo-block to appear, and search for **SSR Decision Block**.

1. Configure the Decision Block: select your new Geolocation Segment set; click **Select Segment Set**.

1. In the Configure Reactions section, click Edit, and add the “Hello…” blocks you created to the corresponding segment.

1. Add placement configuration to the block and save the block.

1. Navigate to the page with the block and you will see the personalization you configured.

1. If you don’t have a VPN client, navigate to the **Segments Sets Admin** page at `/admin/structure/smart_content_segment_set`, edit the set, select one preview checkbox, and save.

The content corresponding to this segment will display. Please note that only users who are logged in can access the content in preview; anonymous users will not have access.

### Configure Interest via Taxonomy

In this section, we identify the content type where you want to use personalization by Interest, add a taxonomy field, and connect it to the pertinent vocabulary. For this example, we will assume it is Tags `field_tags`.

1. Navigate to **Admin > Config > System > Smart Content CDN** at `/admin/config/system/smart-content-cdn`. In the configuration form for Smart CDN, select the checkbox for Tags. The form automatically reads all available taxonomy reference terms for all content types and allows you to select them.
    ![Interest Fields](../../../images/guides/edge-integrations/interestfields.png)

1. Create tags for your Tags vocabulary.

1. Review your content and tag it using the Tags vocabulary (e.g. "Biking").

1. Navigate to `/admin/structure/smart_content_segment_set` to configure geolocation segments. 

1. Click **+Add Global Segment Set**.
    ![Add Global Segment Set](../../../images/guides/edge-integrations/segementsetentities.png)

1. Provide a label (e.g. Interest) - the name isn't critical.

1. Click **Add Segment**.
    ![Add Segment](../../../images/guides/edge-integrations/setsegment.png)

1. Change segment name to something meaningful. We recommend matching the term name (e.g. "Biking").

1. Select Interest condition under the Smart CDN category.

1. Click **Add Condition**.

1. Fill in value for **Equals** with the taxonomy term name.
    ![Interests](../../../images/guides/edge-integrations/interests.png)

1. Set default segment and save.

1. Create content blocks per segment; they can also be views or block types.

1. Add another **SSR Decision Block**, select Interest segment, and configure reactions. Place block and save.

1. Navigate to the page with the block and you will see the personalization you configured.

1. If you don’t have a VPN client, navigate to the **Segments Sets Admin** page at `/admin/structure/smart_content_segment_set`, edit the set, select one preview checkbox, and save.

The content corresponding to this segment will display. Please note that only users who are logged in can access the content in preview; anonymous users will not have access.

## Additional Configuration

There is some additional configuration that you can apply to Smart Content. The Interest is of particular importance. It is calculated by the frequency with which the page tagged with a certain term is visited.

To set up the threshold after which the user will be placed in the particular Interest segment:

1. Navigate to the **Configuration > System > Smart Content CDN Configuration** page at `/admin/config/system/smart-content-cdn`.
    ![configform](../../../images/guides/edge-integrations/smartcdnconfiguration.png)

1. Update the Interest threshold value.

1. Clear the cache.

<!--

### Subscriber

Note: Subscriber method is paywalled, and currently not covered in the documenation.

<Alert title="Note"  type="info" >

The Role/Subscriber use case requires a JWT module and a private key. It also requires additional configuration on the AGCDN side. It’s currently under active development and will be delivered in future phases.

</Alert>

Subscriber use cases are different from the Geolocation and Interest because there are only two segments: subscribers and anonymous users. You don't need to add a segment set for it if you want to use it to hide content behind the paywall. If you want to show different blocks to subscribers, you can set up the segments similar to how the Geolocation and Interest use cases are done, and select the Role condition.

Role authentication is done on the CDN level via the JWT token. Follow the setup instructions for the module and generate a JWT RSA Key. This key needs to be implemented on the AGCDN layer.

The custom key you create is automatically stored in the `subscriberToken` cookie by the module. To verify that the token generation works and is encrypted using the RSA key:

1. Install and enable the [JWT module](https://www.drupal.org/project/jwt).

1. Navigate to the **Configuration > System > Smart Content CDN Configuration** page at `/admin/config/system/smart-content-cdn`.

1. Update subscriber threshold, which is the number of free articles the anonymous user can view.

1. Select content types that need to be locked behind the paywall.

1. Save configuration; the content is now protected by a paywall.

1. The users that have a Subscriber role can log in using the Drupal login form.

1. Editors and administrators can use the Smart CDN Preview module to masquerade as a subscribed user.
-->

## Recap

The Smart Content CDN module extends Smart Content's functionality, and leverages the [Pantheon Edge Integrations](https://github.com/pantheon-systems/pantheon-edge-integrations), a CMS-agnostic PHP library. The setup steps above provide two use cases: Geolocation and Interest, but there is much more you can accomplish with Smart Content and content personalization. For more information about the module, and other possible use cases, refer to the [Smart Content CDN module](https://github.com/pantheon-systems/smart_content_cdn).

## More Information

Pantheon Edge Integrations uses header data to provide a personalization object that is utilized for personalizing content for each user. To make use of the PHP library, ensure PHP can use the class:

`use Pantheon\EI\HeaderData;`

### Class Methods

In order to use the class methods, you need to create a HeaderData object:
- `$headerData = new HeaderData();`

<Accordion title="$headerData->getHeader(key)" id="getHeader" icon="wrench">

Use header key to return raw header data.

Examples:

- `key: “Audience” => return: “geo:US”`

- `key: “Interest” => return: “27”`

</Accordion>

<Accordion title="$headerData->parseHeader(key)" id="parseHeader" icon="wrench">

Use header key to return parsed header data array.

Examples:

- `key: “Audience” => return: “geo:US”`

- `key: “Interest” => return: “27”`

</Accordion>

<Accordion title="$headerData->returnPersonalizationObject()" id="headerData" icon="wrench">

Return an array with personalization data.

Examples:

- `key: “Audience” => return: “geo:US”`

- `key: “Interest” => return: “27”`

</Accordion>

### Global Methods

There are global methods that mirror the class methods in order to ease the API usage. These include:

- `HeaderData::personalizationObject()`

- `HeaderData::parse()`

- `HeaderData::header()`

- `HeaderData::returnVaryHeader()`

For more information on what these methods expect and return, refer to [Pantheon's API documentation](https://github.com/pantheon-systems/pantheon-edge-integrations/#pantheon-edge-integrations).

### Obtain Header Within a Custom Module

The follow can be used in any class context, or procedural context in any hook.

To include the library, run:

`use Pantheon\EI\HeaderData;`

Use the following snippet to obtain the header data object:

```bash
    #Get header data.
    $smart_content_cdn = new HeaderData();
    $p_obj = $smart_content_cdn->returnPersonalizationObject();
```
