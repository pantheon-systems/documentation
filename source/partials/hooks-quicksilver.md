## Hooks

You can hook into the following workflows:

| Workflow                               | Description                                                         | Location of webphp runtime | Notes                                       |
|:-------------------------------------- |:------------------------------------------------------------------- |:-------------------------- |:------------------------------------------- |
| `autopilot_vrt`                          | Autopilot Visual Regression test                                             | "Autopilot" Multidev                            | `after` stage valid, `before` stage invalid                                           |
| `clear_cache`                       | Clear CMS and Edge Cache                                 |             |                                             |
| `clone_database`                               | Clone database between environments                                         | target (to_env)                    |                                             |
| `create_cloud_development_environment`                       | Create Multidev environment                                             | Multidev               | `after` stage valid, `before` stage invalid
| `deploy`                            | Deploy code to Test or Live | target            |                                             |
| `deploy_product` | Create site                                         | Dev                   | `after` stage valid, `before` stage invalid |
| `sync_code`                        | Use the command `git push` command to change the code; commit via the Pantheon Dashboard, upstream update, Multidev merge, or automated workflows                                    | Dev or Multidev      |   |
 

<Alert type="info" title="Note">

For sites using [Integrated Composer](/guides/integrated-composer), the `sync_code` hook runs after the build finishes and the artifacts have been completely deployed to the application server.

</Alert>