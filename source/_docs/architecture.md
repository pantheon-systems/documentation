---
title: Pantheon Architecture
description: Detailed information about the Pantheon Website Management Platform infrastructure.
draft: true
---
## Cloud Infrastructure Provider
Pantheon proudly runs on RackSpace and Amazon S3. We utilize the most advanced hardware our infrastructure providers can provide, and we do so very efficiently.

## Endpoint VM
Each of the bare-metal physical machines we run on is called an endpoint. We manage a single VM on each endpoint, running Fedora 20 and CoreOS.

## System D custom C-groups (Containers)


## Edge
Traffic coming to your site first hits the Edge routing and caching layer.

## STYX Boxes


## HA Proxy


## Varnish


## NGINX


## Application containers


## NGINX


## [PHP-FPM](http://php-fpm.org)

"PHP FastCGI Process Manager is an alternative PHP FastCGI implementation with some additional features useful for sites of any size, especially busier sites.""


<dl><h3>PHP Versions</h3>
<dt>PHP 5.5</dt>
<dd>Define php 5.5</dd>
<dt>PHP 5.3</dt>
<dd>Define php 5.3</dd>
<dt>HHVM</dt>
<dd>Define HHVM</dd>
</dl>
##Code

If you connect to your Dev environment's codebase via SFTP, you'll notice your site's codebase is inside the /code directory. Git pushes end up in this directory.

## Drupal


## WordPress


## Pantheon File System
Pantheon uses a proprietary implementation of FuseDav to manage files between environments.

## Drupal /sites/default/files/


## WordPress /wp-uploads/


##Bindings
Each environment's application container is bound to other containers, forming a cluster.

##DB container


##Varnish container


##New Relic


##Redis container


##Apache SOLR container


##Single origin IP


##SOLR containers


##REDIS containers


##Valhalla clusters
