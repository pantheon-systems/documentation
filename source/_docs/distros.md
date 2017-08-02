---
title: New Sites and Public Distributions
description: Learn how to create sites using a public distribution start state.
tags: [create]
---
The Pantheon Dashboard provides a quick "click to install" method of creating new sites that utilize our default, "vanilla" frameworks (e.g., WordPress, Drupal 7, and Drupal 8). However, it's possible to create sites that use an available public distribution (e.g., Panopoly) with Terminus, the Pantheon CLI.

## Install and Authenticate Terminus
Terminus provides advanced interaction with the platform and provides access to additional start states during site creation. Terminus also opens the door to automating parts of your workflow by combining multiple operations. For more information about Terminus itself, see our [Terminus Manual](/docs/terminus).

1.  Install Terminus within the `$HOME/terminus` directory:

        mkdir $HOME/terminus
        cd $HOME/terminus
        curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install

2.  [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from within **User Dashboard** > **Account** > **Machine Tokens**. Then use it to authenticate Terminus:

        terminus auth:login --machine-token=‹machine-token›

3.  Once installed, verify your session:

        terminus site:list

If you see your Pantheon sites, then it was installed and authenticated successfully!

## List Available Public Distributions
Run `terminus upstream:list` and review available upstreams:

```bash
$ terminus upstream:list
 -------------------------------------- --------------------------------------------- -------- -----------
  ID                                     Name                                          Type     Framework
 -------------------------------------- --------------------------------------------- -------- -----------
  a9591171-63d7-4c5a-9007-199f5d643dbf   OpenScholar                                   custom   drupal
  f141b5e0-a614-4294-a86c-6c24df9bf6c5   Pushtape                                      custom   drupal
  e8fe8550-1ab9-4964-8838-2b9abdccf4bf   WordPress                                     custom   wordpress
  6413825e-7c23-3549-bbf1-c797251bf6e9   CU Express 3                                  custom   drupal8
  6eb1ad36-afef-46d7-90d1-3a1bd4296863   Open Restaurant                               custom   drupal
  b1057113-272a-4509-b0b0-1362ec31d71c   Demo Upstream                                 custom   drupal
  cbdeadf3-669f-4848-94f5-c2354f256de8   Advostarter D8                                custom   drupal8
  1df1bc7d-d4c8-4a1d-bba8-3abced800af0   Community Media Starter Kit                   custom   drupal
  feb5fe01-bd8b-45dd-a753-e7d48b72b2e6   EasterEgg Kit                                 custom   drupal8
  c3fea99e-780a-4dbb-b724-2324d446357d   Wordpress Class                               custom   wordpress
  158e2876-13a4-427f-96cf-d29a3daa538b   Sprowt                                        custom   drupal
  8156b3b3-1eec-4d32-ba51-ffe736bcd0e3   Open Ideal 6 (Deprecated)                     custom   drupal
  8a129104-9d37-4082-aaf8-e6f31154644e   Drupal 8                                      custom   drupal8
  6e8b5dbf-5093-4a29-b47b-e052fa2e5a45   Restaurant                                    custom   drupal
  60484a01-2b74-4bc1-8a63-a9bfb16dcfdf   FreakPress                                    custom   wordpress
  e44da442-2b1e-639a-f790-edf7cb26c9a0   Rutgers School Website - Wordpress            custom   wordpress
  175cce4f-fa3f-4426-b1a6-e0fae9e19f2e   Panopoly                                      custom   drupal
  4c17f505-05d0-4b79-b38a-0bc548405a10   Open Outreach                                 custom   drupal
  35b0e365-a191-4c70-adbe-9d02d01343f3   Drops 8 Composer                              custom   drupal8
  b459145b-8771-4597-8b84-684a3d93dce0   OpenPublic                                    custom   drupal
  4c7176de-e079-eed1-154d-44d5a9945b65   Empty Upstream                                custom   drupal8
  d0da49ff-01b3-4351-b53a-a2625b0f8976   Mukurtu CMS                                   custom   drupal
  86112161-4cb2-410f-8bb1-8a1fb4f56dae   OpenIdeaL                                     custom   drupal
  216f85b2-620b-470d-9597-f64ade76dc9a   Plato Típico                                  custom   drupal
  64408272-2d4b-614a-753b-334a2baf4263   Rutgers Unit/Department Website - Wordpress   custom   wordpress
  8ad1efe0-0231-42ae-9520-c96241495b82   Panopoly                                      custom   drupal
  8ed60b88-e3bb-4981-9701-777ee9e40435   Test PS Digital                               custom   wordpress
  50dba1c5-1ff4-4057-a6d5-b31f128894db   Open Ideal 7 (Master)                         custom   drupal
  31bc4254-be20-4e8d-afe6-6c585e58435a   Atrium                                        custom   drupal
  53711c64-41eb-4f42-9ca9-a370f8e1e36f   Empty WordPress                               custom   wordpress
  8a662dde-53d6-4fdb-8eac-eea9f5848d00   Commerce Kickstart                            custom   drupal
  bf703821-4c18-45a1-88b8-3d9ec302273d   Backdrop                                      custom   backdrop
  36cf4269-31a6-4f65-a467-f51114715102   Introduction to Theming Basics for Drupal 7   custom   drupal
  3b754bc2-48f8-4388-b5b5-2631098d03de   CiviCRM Starter Kit                           custom   drupal
  bc77fa2f-2235-4eec-8e6b-4d69d1cf5908   OpenPublish                                   custom   drupal
  de858279-cb87-4664-825c-fcb4c2928717   Static HTML                                   custom   unknown
  d7370d7e-46fb-4b10-b79f-942b5abf51de   DKAN                                          custom   drupal
  4fa4f7d1-e341-48f7-9594-4e7c21b9bb68   Drupal8 PHP                                   custom   drupal8
  5b70ea4b-8ba3-4c78-9cf2-8086a5524885   Open Academy                                  custom   drupal
  bd5bac3b-2ed4-4b0b-b085-b9cfb574940f   Open Enterprise (Deprecated)                  custom   drupal
  10d6937e-1dd2-4490-9950-11867ba43597   RedHen Raiser                                 custom   drupal
  21e1fada-199c-492b-97bd-0b36b53a9da0   Drupal 7                                      custom   drupal
  2adff196-4672-44c9-af2a-4590963b90d8   OpenAid                                       custom   drupal
  f575e77a-ff49-4bab-a53c-dbf8f59247bc   Empty Drupal 7                                custom   drupal
  0fce9338-bd6f-4b87-a489-e9928a027696   Elephant Ventures Drupal Patterns             custom   drupal
  974b75c2-4ba7-49f8-8a54-3a45c07dfe02   Drupal 6                                      custom   drupal
  c28628b2-6b8f-4962-9838-69295c3fff68   Fairfax County Public Schools                 custom   drupal8
 -------------------------------------- --------------------------------------------- -------- -----------
 ```

## Create New Sites
Run `terminus site:create <site> <label> <upstream>` to create a new site using the desired distribution, like so:

```
$ terminus site:create my-new-panopoly-site "My New Panopoly Site" "Panopoly"
 [notice] Creating a new site...
 [notice] Deploying CMS...
 [notice] Deployed CMS
$ terminus dashboard:view my-new-panopoly-site
 ```
