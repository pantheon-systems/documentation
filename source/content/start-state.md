---
title: Choosing Your Start State
description: See available options for starting new Drupal or WordPress sites and site import considerations.
tags: [upstreams, site]
reviewed: "2023-03-28"
contenttype: [doc]
innav: [true]
categories: [create]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

Select the site's framework during the [site creation process](/guides/legacy-dashboard/create-sites). Pantheon Upstreams provide default installations of WordPress, Drupal (Latest Version), and Drupal 7.

<Alert title="Note"  type="info" >

Drupal 8 reached end-of-life status in November 2021, and is no longer supported by Drupal. Read the [official announcement on Drupal.org](https://www.drupal.org/psa-2021-06-29).

</Alert>

[Custom Upstreams](/guides/custom-upstream) are available to team members when the Workspace is associated during site creation.

## Pantheon Upstreams

We base our Drupal repositories on the canonical source from [Drupal.org](https://www.drupal.org/). We extend Drupal 7 sites with [Pressflow](http://www.pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment that is automatically included in the Drupal Latest Version. The WordPress repository includes platform integration plugins and a pre-configured `wp-config.php` file.

- [WordPress](https://dashboard.pantheon.io/sites/create?upstream_id=e8fe8550-1ab9-4964-8838-2b9abdccf4bf) (id: e8fe8550-1ab9-4964-8838-2b9abdccf4bf)
- [Drupal (Latest Version)](https://dashboard.pantheon.io/sites/create?upstream_id=897fdf15-992e-4fa1-beab-89e2b5027e03) <Popover content="Defaults to SFTP Mode" /> (id: 897fdf15-992e-4fa1-beab-89e2b5027e03)
- [Drupal 7](https://dashboard.pantheon.io/sites/create?upstream_id=21e1fada-199c-492b-97bd-0b36b53a9da0) (id: 21e1fada-199c-492b-97bd-0b36b53a9da0)

### Empty Upstream

An empty Upstream is a Custom Upstream that does not have any content or code:

- [Pantheon Empty Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65) (id: 4c7176de-e079-eed1-154d-44d5a9945b65)

Use an empty Upstream to [host a static site or files on Pantheon](/static-site-empty-upstream).

## Public Distributions

We make a growing number of Drupal products available in Upstreams on Pantheon. These products are also known as installation profiles or distributions and contain much more functionality than a Drupal core installation.

<Alert title="Note" type="info">

If the distribution you are using is behind on core releases or any of its included plugins, please contact the maintainer through [Drupal.org](https://www.drupal.org) or the distribution's GitHub issue queue.

</Alert>

Use the following direct links to create a new site on Pantheon from a public distribution:

- [CiviCRM Starter Kit](https://dashboard.pantheon.io/sites/create?upstream_id=3b754bc2-48f8-4388-b5b5-2631098d03de) [<Icon icon="github"/>](https://github.com/kreynen/civicrm-starterkit-drops-7)
- [DKAN](https://dashboard.pantheon.io/sites/create?upstream_id=d7370d7e-46fb-4b10-b79f-942b5abf51de) [<Icon icon="github"/>](https://github.com/NuCivic/dkan-drops-7)
- [Commerce Kickstart](https://dashboard.pantheon.io/sites/create?upstream_id=8a662dde-53d6-4fdb-8eac-eea9f5848d00) [<Icon icon="github"/>](https://github.com/commerceguys/kickstart-drops-7)
- [OpenAid](https://dashboard.pantheon.io/sites/create?upstream_id=2adff196-4672-44c9-af2a-4590963b90d8) [<Icon icon="github"/>](https://bitbucket.org/joelsteidl/openaid-drops-7)
- [Atrium](https://dashboard.pantheon.io/sites/create?upstream_id=31bc4254-be20-4e8d-afe6-6c585e58435a) [<Icon icon="github"/>](https://github.com/phase2/openatrium-drops-7)
- [OpenIdeaL](https://dashboard.pantheon.io/sites/create?upstream_id=86112161-4cb2-410f-8bb1-8a1fb4f56dae) [<Icon icon="github"/>](https://github.com/linnovate/openideal-on-drops-7)
- [Open Outreach](https://dashboard.pantheon.io/sites/create?upstream_id=4c17f505-05d0-4b79-b38a-0bc548405a10) [<Icon icon="github"/>](https://github.com/nedjo/openoutreach-drops-7)
- [OpenPublic](https://dashboard.pantheon.io/sites/create?upstream_id=b459145b-8771-4597-8b84-684a3d93dce0) [<Icon icon="github"/>](https://github.com/phase2/openpublic-drops-7)
- [Panopoly](https://dashboard.pantheon.io/sites/create?upstream_id=175cce4f-fa3f-4426-b1a6-e0fae9e19f2e) [<Icon icon="github"/>](https://github.com/populist/panopoly-drops-7)
- [Plato Típico](https://dashboard.pantheon.io/sites/create?upstream_id=216f85b2-620b-470d-9597-f64ade76dc9a) [<Icon icon="github"/>](https://github.com/enzolutions/plato_tipico)
- [Pushtape](https://dashboard.pantheon.io/sites/create?upstream_id=f141b5e0-a614-4294-a86c-6c24df9bf6c5) [<Icon icon="github"/>](https://github.com/zirafa/pushtape-drops-7)
- [RedHen Raiser](https://dashboard.pantheon.io/sites/create?upstream_id=10d6937e-1dd2-4490-9950-11867ba43597) [<Icon icon="github"/>](https://github.com/thinkshout/redhenraiser-drops-7)

## Product UUID

There is a UUID for all the different systems you can install on Pantheon. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all available products, run the following [Terminus](/terminus) command:

```bash{promptUser: user}
terminus upstream:list --all
```

## Create Sites with Terminus

Create new sites with [Terminus, the Pantheon CLI](/terminus). Run `terminus site:create <site> <label> <upstream>` to create a new site using the desired upstream:

```bash{outputLines: 2-4}
terminus site:create my-new-panopoly-site "My New Panopoly Site" "Panopoly"
 [notice] Creating a new site...
 [notice] Deploying CMS...
 [notice] Deployed CMS
terminus dashboard:view my-new-panopoly-site
```

## Import an Existing Site

Your site migration has four phases. You’ll package your site, import it, test it out, then change DNS and go live. With a good plan and understanding of the platform, the process will run smoothly. For detailed information, see [Migrate Sites to Pantheon](/guides/guided/).
