---
title: Pantheon Secrets Guide
subtitle: Terminus Secrets Manager Plugin
description: Terminus plugin for Pantheon Secrets
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/terminus-plugin
reviewed: "2024-05-01"
---

**IMPORTANT: when Pantheon Secrets goes into "General Availability," it will be part of terminus core. Until then, this plugin information covers [Terminus Secrets Manager Plugin]( https://github.com/pantheon-systems/terminus-secrets-manager-plugin).**

# Terminus Secrets Manager Plugin

## Plugin Management

### To Install:

```
terminus self:plugin:install terminus-secrets-manager-plugin
```

### To Uninstall:

```
terminus self:plugin:uninstall terminus-secrets-manager-plugin
```

### To Update:

```
terminus self:plugin:update terminus-secrets-manager-plugin
```

## Secrets Commands

#### Set a secret

The secrets `set` command takes the following format:

- `Name`
- `Value`
- `Type`
- `One or more scopes`


**Run the command below to set a new secret in Terminus:**

```
terminus secret:site:set <site> <secret-name> <secret-value>

[notice] Success
```

```
terminus secret:site:set <site> file.json "{}" --type=file

[notice] Success
```

```
terminus secret:site:set <site> <secret-name> --scope=user,ic

[notice] Success
```

Note: If you do not include a `type` or `scope` flag, these values will be set to the defaults (`runtime` and `user` respectively).


**Run the command below to update an existing secret in Terminus:**

```
terminus secret:site:set <site> <secret-name> <secret-value>

[notice] Success
```

Note: When updating an existing secret, `type` and `scope` should NOT be passed as they are immutable. You should delete and recreate the secret if you need to update those properties.


**Add or update an environment override for an existing secret in Terminus:**

```
terminus secret:site:set <site>.<env> <secret-name> <secret-value>

[notice] Success
```

Note: You can add an environment override only to existing secrets; otherwise, it will fail.


#### List secrets

The secrets `list` command provides a list of all secrets available for a site. The following fields are available:

- `Name`
- `Scope`
- `Type`
- `Value`
- `Environment Override Values`
- `Org Values`

Note that the `value` field will contain a placeholder value unless the `user` scope was specified when the secret was set.

**Run the command below to list a site’s secrets:**


```
terminus secret:site:list <site>

 ------------- ------------- ---------------------------
  Secret name   Secret type   Secret value
 ------------- ------------- ---------------------------
  secret-name   env           secrets-content
 ------------- ------------- ---------------------------
```

```
terminus secret:site:list <site> --fields="*"

 ---------------- ------------- ------------------------------------------ --------------- ----------------------------- --------------------
  Secret name      Secret type   Secret value                               Secret scopes   Environment override values   Org values
 ---------------- ------------- ------------------------------------------ --------------- ----------------------------- --------------------
  foo              env           ***                                        web, user
  foo2             runtime       bar2                                       web, user                                     default=barorg
  foo3             env           dummykey                                   web, user       live=sendgrid-live
 ---------------- ------------- ------------------------------------------ --------------- ----------------------------- --------------------
 ```

#### Delete a secret

The secrets `delete` command will remove a secret and all of its overrides.

**Run the command below to delete a secret:**

```
terminus secret:site:delete <site> <secret-name>

[notice] Success
```

**Run the command below to delete an environment override for a secret:**

```
terminus secret:site:delete <site>.<env> <secret-name>

[notice] Success
```

#### Generate file for local development

The secrets `local-generate` command will generate a json file useful for local development emulation of secrets.

**Run the command below to get a json file:**

```
terminus secret:site:local-generate <site> --filepath=./secrets.json
[notice] Secrets file written to: ./secrets.json. Please review this file and adjust accordingly for your local usage.
```

### Organization secrets Commands

#### Set a secret

The secrets `set` command takes the following format:

- `Name`
- `Value`
- `Type`
- `One or more scopes`

**Run the command below to set a new secret in Terminus:**

```
terminus secret:org:set <org> <secret-name> <secret-value>

[notice] Success
```

```
terminus secret:org:set <org> file.json "{}" --type=file

[notice] Success
```

```
terminus secret:org:set <org> <secret-name> --scope=user,ic

[notice] Success
```

Note: If you do not include a `type` or `scope` flag, their defaults will be `runtime` and `user` respectively.

**Run the command below to update an existing secret in Terminus:**

```
terminus secret:org:set <org> <secret-name> <secret-value>

[notice] Success
```

Note: When updating an existing secret, `type` and `scope` should NOT be passed as they are immutable. You should delete and recreate the secret if you need to update those properties.

**Add or update an environment override for an existing secret in Terminus:**

```
terminus secret:org:set --env=<env> <org> <secret-name> <secret-value>

[notice] Success
```

Note: You can add an environment override only to existing secrets; otherwise, it will fail.


#### List secrets

The secrets `list` command provides a list of all secrets available for an organization. The following fields are available:

- `Name`
- `Scope`
- `Type`
- `Value`
- `Environment Override Values`

Note that the `value` field will contain a placeholder value unless the `user` scope was specified when the secret was set.

**Run the command below to list a site’s secrets:**


```
terminus secret:org:list <org>

 ------------- ------------- ---------------------------
  Secret name   Secret type   Secret value
 ------------- ------------- ---------------------------
  secret-name   env           secrets-content
 ------------- ------------- ---------------------------
```


```
terminus secret:org:list <org> --fields="*"

 ---------------- ------------- ------------------------------------------ --------------- -----------------------------
  Secret name      Secret type   Secret value                               Secret scopes   Environment override values
 ---------------- ------------- ------------------------------------------ --------------- -----------------------------
  foo              env           bar                                        web, user
  foo2             runtime       bar2                                       web, user
  foo3             env           dummykey                                   web, user       live=sendgrid-live
 ---------------- ------------- ------------------------------------------ --------------- -----------------------------
 ```

#### Delete a secret

The secrets `delete` command will remove a secret and all of its overrides.

**Run the command below to delete a secret:**

```
terminus secret:org:delete <org> <secret-name>

[notice] Success
```

**Run the command below to delete an environment override for a secret:**

```
terminus secret:org:delete --env=<env> <org> <secret-name>

[notice] Success
```

### Help

Run `terminus list secret` for a complete list of available commands. Use terminus help <command> to get help with a specific command.

