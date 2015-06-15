---
title: Apache Solr on Pantheon
description: Detailed information on using Apache Solr on the Pantheon Website Management Platform.
category:
    - drupal
    - developing
keywords: apche, apache solr, index, indexing, searching, index and search, indexing and searching, solr, how to enable solr, enable solr, solr api, indexserver solr, solr indexserver, solr api, enable solr search, apachesolr, apache solor search module, solr modules, configure solr,
---
Apache Solr is a system for indexing and searching site content. Pantheon provides Apache Solr v3.6 as a service for most plans including the free sandbox. No permission or action is required from Pantheon to use Solr.  

One of the modules already included in every Pantheon Drupal site is [pantheon\_apachesolr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr). This module **must** be enabled and configured in each environment (Dev, Test, and Live, and each Multidev) in order to use Pantheon's Apache Solr service. pantheon\_apachesolr is not required if you are using a third-party Solr service.

## Which Plans Can Use Solr?

Currently, all plans except for a Personal plan can use Solr. Solr is available to Sandbox plans for developmental purposes, but Solr will not be available going live on a Personal plan.

<table>
	<tbody>
			<tr>
        <th align="left" style="width: 130px">Plan</th>
        <th align="left" style="width: 130px">Is Solr Available?</th>
			</tr>
			<tr>
			</tr>
			<tr>
        <td align="left">Sandbox</td>
        <td align="left">Yes</td>
			</tr>
			<tr>
        <td align="left">Personal</td>
        <td align="left">No</td>
			</tr>
			<tr>
        <td align="left">Professional</td>
        <td align="left">Yes</td>
			</tr>
			<tr>
        <td align="left">Business</td>
        <td align="left">Yes</td>
			</tr>
			<tr>
        <td align="left">Enterprise</td>
        <td align="left">Yes</td>
			</tr>
			<tr>
        <td align="left">Pantheon One</td>
        <td align="left">Yes</td>
			</tr>
	</tbody>
</table>

## Enabling Solr for a Pantheon Site

1. Add the IndexServer from the Dashboard (Settings -> Add-Ons -> Solr).
2. Make sure you have the [latest version of Drupal](/docs/articles/sites/code/applying-upstream-updates#apply-a-core-update).
3. Add either the Apache Solr Search or Search API Solr search module to your code base.
4. Enable the Pantheon Apache Solr module.
5. Post the schema.xml using the Pantheon Apache Solr module.
6. Enable and configure your Solr module.

## Add the IndexServer from the Dashboard

First, you will need to add the IndexServer to your site. This can be done from the Dashboard by going to Settings > Add Ons > Solr:<br />
 ![](/source/docs/assets/images/desk_images/290603.png)
## Add Apache Solr Search or Search API Solr Search Module

Two contributed modules are supported by Pantheon:

- [​https://drupal.org/project/apachesolr](https://drupal.org/project/apachesolr) - 7.x-1.4 and 6.x-1.8
- [https://drupal.org/project/search\_api\_solr](https://drupal.org/project/search_api_solr) - 7.x-1.2

For most users, the apachesolr module is the easiest to configure and maintain, and includes functionality like facets and other great features.  

If you rely on highly customized data structures and the apachesolr module is not enough for your needs, search\_api\_solr provides an alternative with a more powerful interface, but is much more complex.  

Choose one or the the other and add it to your code base. Do not enable or configure it yet.

## Enable the Pantheon Apache Solr Module

You must enable the Pantheon Apache Solr module in order to use Pantheon's Solr Service.  
​ ![](/source/docs/assets/images/desk_images/192432.png)  

Once enabled, the service can be configured. Click **Configure**, or navigate to Administration > Configuration > Pantheon Apache Solr.

 ![](/source/docs/assets/images/desk_images/192434.png)
## Post the schema.xml Using the Pantheon Apache Solr Module

The next step is to post the schema.xml, which describes Drupal fields to the Solr search indexer. Additionally, posting the schema will activate the Solr server for the site environment. Click **Post schema.xml**.  

 ![](/source/docs/assets/images/desk_images/192435.png)  
Choose the appropriate schema for the module that you are using (apachesolr or search\_api\_solr) and Solr version (3.5.0). In the vast majority of cases, you will want to use 3.x/schema.xml. Do not attempt to use schemas intended for different versions of Solr, because it won't work. When you've made your selection, click **Post schema**.  
 ![](/source/docs/assets/images/desk_images/192443.png)  
<div class="alert alert-info" role="alert">
<strong>Note</strong>: You must post the schema.xml in each environment (Dev, Test, and Live) that you want to use Pantheon's Solr Service in.</div>

### Enable and Configure Your Solr Module

### Apache Solr Search (apachesolr)

Enable both the **Apache Solr framework** and **Apache Solr Search** modules.
 ![](/source/docs/assets/images/desk_images/192444.png)
Browse to the main Apache Solr settings screen and you should now see an index is ready for you. You do not need to configure any server settings, but you can still handle your facet and bias settings as per normal:
 ![Configure Solr Settings](/source/docs/assets/images/desk_images/27787.png)

Note that the default connection parameters are correct and do not need changing. After this point, your configuration and settings will be the same as any generic Apache Solr use case.

#### Search API Solr Search (search\_api\_solr)

Three modules are required; [entity](https://drupal.org/project/entity),  [search\_api](https://drupal.org/project/search_api) and  [search\_api\_solr](https://drupal.org/project/search_api) need to be installed and enabled.  
 ![](/source/docs/assets/images/desk_images/192457.png)

## Known Limitations of Pantheon's Solr Service

- Anything that takes more than 5 seconds to send to to the Solr server be indexed will timeout, which will block indexing. For example, large documents attached to Drupal nodes. In these cases, the developer must work with the content or code to exempt the nodes and/or files from being indexed.
- solrconfig.xml and synonyms.txt cannot be modified.
- If you have a very large number of facets, the URLs generated by CURL may exceed length limits (may be fixed in search\_api).
- Non-English letters and characters will not be recognized because the Solr database is not UTF-8 encoded.  Therefore, multi-lingual search is not supported.

## Alternatives to Pantheon's Solr Service

While Pantheon provides a stable, reliable, and basic Solr service, your individual site needs may require something more robust and customizable. In those cases, a dedicated hosted Solr service may be a better solution for your needs. Given that Solr can tolerate higher latency (one query per request vs hundreds of database queries), Solr servers do not need to be in the same data center to provide fast and responsive results.

Some customers have reported success using external Solr service providers such as [http://websolr.com/](http://websolr.com/) for their Solr indexing.

## Apache Solr Vocabulary

<dl>
	<dt>bias</dt>
	<dd>Allows certain parts of indexed items to influence the importance of search results. The higher the bias, the greater the influence; the range is 0.1 to 21.0.</dd>
	<dt>core</dt>
	<dd>A core is a separate configuration and index using a single Solr instance. A core is created when the schema is posted. For more information, see <a href="http://wiki.apache.org/solr/CoreAdmin">http://wiki.apache.org/solr/CoreAdmin</a>.
</dd>
	<dt>document</dt>
	<dd>A document is similar to a database row, containing the contents of what is to be searched and whatever fields are associated with it, like title.</dd>
	<dt>facet</dt>
	<dd>Search facets allow search results to be filtered; examples include seeing a list of potential filters and the count of matches for each filter on the left, like Amazon product searches.</dd>
	<dt>index</dt>
	<dd>structure containing extracted keywords from a document for rapid search and retrieval, similar to a database table.</dd>
	<dt>score</dt>
	<dd>calculated relevance of matches influenced by bias, represented as a float.</dd>
	<dt>schema.xml</dt>
	<dd>Contains details about the fields that documents can contain, and how those fields are handled when adding documents to the index or querying those fields. Must be posted using the pantheon_apachesolr module before indexing and searching will work. For more information, see <a href="http://wiki.apache.org/solr/SchemaXml">http://wiki.apache.org/solr/SchemaXml</a>.
</dd>
</dl>

## Additional Help

The Pantheon Solr module provides a comprehensive help section that describes a number of key Solr concepts and terms. View it by going to Administration > Help > Pantheon Apache Solr.

## Pantheon Solr Service Status

The Pantheon Solr module provides several interfaces for troubleshooting the health of the service, along with the ability to manually perform queries. These checks are independent of contrib module configurations in order to determine whether the service itself is performing properly, or if there is there is a problem with your site configuration.

### Status

This interface reports what the last schema that was posted to the service and whether the service itself responds to a ping.  

Administration > Configuration > Search and metadata > Pantheon Apache Solr
 ![](/source/docs/assets/images/desk_images/192483.png)

### Execute Query

The Pantheon Apache Solr module provides an interface for administrators to send queries directly to the Solr server, independently of any contrib module. This is advanced functionality and is intended for debugging purposes only. Try queries like `/admin/ping` to see the raw server response.

 ![](/source/docs/assets/images/desk_images/192486.png)

### Drupal Status Report

The Pantheon Apache Solr ​module also adds an item to the Administration > Reports > Status report that performs a similar check to the Status check, independently of contrib module configurations.  
 ![](/source/docs/assets/images/desk_images/192484.png)

## Troubleshooting

The following are Pantheon-specific variables that you can check for, depending on the module you are using.  

Keep in mind that newly indexed items have a 2-minute delay until cron has been run or manually indexed before they become available in Solr search.

####apachesolr.module
If you're using the Apache Solr module, you can check for the existence of this variable using [Terminus](https://github.com/pantheon-systems/cl):

    terminus drush --site=<site> --env=<env> vget apachesolr_service_class

####search_api_solr.module
If you are using search_api_solr.module you can check it with the command:

    terminus drush --site=<site> --env=<env> vget search_api_solr_connection_class


<div class="alert alert-info" role="alert">
<strong>Note</strong>: Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>

### Error During Search API Solr Installation

If you receive the following error, be sure that you have followed all of the instructions as described in the INSTALL.txt. We can not resolve this for you as it is part of the module setup:

    Exception: SolrPhpClient library not found! Please follow the instructions in search_api_solr/INSTALL.txt for installing the Solr search module. in _search_api_solr_solrphpclient_path()

### Common Techniques


#### Did you post the schema into all your environments?

It needs to be done for Dev, Test and Live individually. You can do this at `admin/config/search/pantheon`

#### Re-index Content

You can do this at `admin/config/search/apachesolr`. This will add any new content that has not yet been indexed to the Solr index (within the provided numbers-per-indexing setting).

#### Check Index and Batch Sizes

Are you only indexing only 50 items at a time and wondering why 100s of new content nodes generated in the last hour aren't being indexed? Numbers are important here. If you need to increase the number of items being indexed with each Solr indexing run, feel free to do so. However, don't get ridiculous here: setting 1000 items to be indexed per run could cause a page timeout. If a specific request times out, that could be because it's trying to POST too much data at once; try reducing the quantity of items being indexed per batch and see if that allows the items to be indexed.

### Apache Spatial Search on Pantheon

Pantheon's Solr configuration does not support geospatial indexing and searching and there are currently no plans to add it.  



As an alternative, there are several external Solr service providers that do support Spatial searching. Pantheon doesn’t do any blocking/filtering, so you’re welcome to use an externally hosted solr index – and in a case where you’re looking for a more complex configuration, that might be optimal.
