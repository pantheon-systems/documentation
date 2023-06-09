---
title: Style Guide
subtitle: Style
description: How we write.
reviewed: "2023-06-09" 
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/style-guide/style
contenttype: [guide]
innav: [false]
categories: [help]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---


Some General Rules:

- Only assume as much knowledge from the reader as specified in the Before You Begin section. Otherwise explain everything.
- [Avoid be verbs](http://writing.rocks/to-be-or-not-to-be/).
- Avoid personal opinions, feelings, or anecdotes. Use an informal but succinct tone.
- Use [Inclusive Language](/inclusive-language), avoid colloquialisms and hyperbole.
- Use [title case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) for section headings.
- Be cognizant of accessibility issues.  See our [Accessibility Guide](https://docs.pantheon.io/guides/accessibility) for details.

## Error Messages

<ReviewDate date="2022-06-05" />

When referencing error messages in the body of an article, format them as monospace, and either place them inline (if short) or as a new paragraph (if long).

When providing solutions to error messages, document them verbatim as H3s within a **Troubleshooting** section. Use the exact copy of the error message to help improve search result findability. Making the header an H3 makes the section linkable within the table of contents for easy sharing.

<Example>

### RedisException: Redis server went away

The following error occurs when Redis has not been enabled within the Site Dashboard:

```none
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.

<hr className="source-code" /> <br/>

````markdown
### RedisException: Redis server went away
The following error occurs when Redis has not been enabled within the Site Dashboard:

 ```none
 RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
 ```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.
````

</Example>

## Placeholder Text

Documentation IP set: specifically reserved for documentation (Reserved IP addresses):

```
203.0.113.0–203.0.113.255
```

Pantheon

- Organization: Anita Agency

- Site name: Anita Drupal

## Product and Feature Terminology

- Personal Workspace: a user's personal work area, containing sites/settings specific to that user.
- Professional Workspace: (formerly Organization) a feature set for a collection of users or sites.
- Site Dashboard: the page the user gets when selecting a site from the **Sites** tab in a Workspace
- Supporting Workspace: (formerly Supporting Organization): a Professional Workspace that's been added to a specific site's Team.

## Screenshots

Submit screenshots without additional markup. For example, don't use Skitch to add an arrow. This helps the Docs team make edits as needed later.

Do not include any personal information like a name, email address, or UUID in the screenshot.

### GUI

Screenshots are used to reference GUI instructions:

<Example>

![Alt text describing the image](../../../images/dashboard/terminus-cli-code-to-commit-dashboard.png)

<hr className="source-code" /> <br/>

```markdown
![Alt text describing the image](../../../images/dashboard/terminus-cli-code-to-commit-dashboard.png)
```

</Example>

### Terminal

Terminal screenshots should be described in the text as much as possible, and should only be used to demonstrate intended output:

<Example>

![Alt text describing the image](../../../images/pr-workflow/composer-require-pathauto.png)

<hr className="source-code" /> <br/>

```markdown
![Alt text describing the image](../../../images/pr-workflow/composer-require-pathauto.png)
```

</Example>

## Variables

When writing multi-step processes, repeated variables and constants should be defined before providing the first set of commands. If the doc has a "Before You Begin" section, define varables here. Provide them using the callout below, and follow common conventions (lowercase for variables, uppercase for constants).

<Example>

<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>

<hr className="source-code" /> <br/>

````markdown
<Alert title="Exports" type="export">

This process uses [Terminus](/terminus) extensively. Before we begin, set the variables `$site` and `$env` in your terminal session to match your site name and the Dev environment:

```bash{promptUser: user}
export site=yoursitename
export env=dev
```

</Alert>
````

</Example>

## Where's the User?

It is important to direct the user to the area in which an activity is taking place.  For example:

<Example>

To create a backup:

1. Click the **Backup** tab.

1. More instructions...

</Example>

This instruction does not tell the user where the Backup tab is - is it in a Workspace?  If so, which one?  Is it on a Site Dashboard?

Instead, start by placing the user in the correct location:

<Example>

To create a backup:

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).

1. Click the **Backup** tab.

1. More instructions...

</Example>

Here are code snippets you can use to direct users to the correct location:

### Dashboard

```markdown
[Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard)
```

### Personal Workspace

```markdown
[Go to your Personal Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces)
```

### Professional Workspace

```markdown
[Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces)

```

