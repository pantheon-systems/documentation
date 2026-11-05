---
title: "Action required: update to Terminus 4.3.5 before the manual backup retention limit on November 16, 2026"
published_date: "2026-11-09"
published_at: "2026-11-09T15:00:00Z"
categories: [tools-apis, action-required]
description: "Starting November 16, 2026, manual backups can be retained for at most 180 days. Update to Terminus 4.3.5 so terminus backup:create keeps working with its default arguments."
---

Starting **Monday, November 16, 2026**, Pantheon limits the retention period of manual backups to a maximum of 180 days. Requests for a longer retention period are rejected. This matches the retention options already available in the Site Dashboard, which offers 30 or 180 days.

If you create manual backups with Terminus, update to Terminus 4.3.5 before that date.

## What is changing

- **Maximum retention:** Manual backups can be retained for at most 180 days. Backup requests that ask for more are rejected.
- **`terminus backup:create` default:** Before Terminus 4.3.5, `terminus backup:create` retained backups for 365 days when you did not pass `--keep-for`. Terminus 4.3.5 changes the default to 30 days, in line with the Site Dashboard.
- **Early validation in Terminus 4.3.5:** `terminus backup:create` now checks `--keep-for` before contacting Pantheon. A value above 180, a value below 1, or a value that is not a whole number stops immediately with a message that explains the allowed range.

Automatic backups and backups created from the Site Dashboard are not affected.

## What happens if you do not update

After November 16, 2026, older versions of Terminus still send the 365-day default. As a result:

- `terminus backup:create` with no `--keep-for` option fails.
- `terminus backup:create` with `--keep-for` set above 180 fails.

Scripts and CI pipelines that run `terminus backup:create` with the default arguments will fail until Terminus is updated.

## Action required

1. Update to Terminus 4.3.5 before November 16, 2026. See [How to upgrade](#how-to-upgrade-terminus).
2. Review any scripts or CI jobs that call `terminus backup:create`:
    - If they rely on the default retention, expect backups to be kept for 30 days instead of 365 days after you update.
    - If they pass `--keep-for` with a value above 180, lower it to 180 or less.

For example, to create a database backup that is retained for 90 days:

```shell{promptUser: user}
terminus backup:create <site>.<env> --element=database --keep-for=90
```

Learn more about [creating backups](/guides/backups/create-backups).

## How to upgrade Terminus

If you use Homebrew (macOS-only) to manage your Terminus installation, you should upgrade using:

```shell{promptUser: user}
brew upgrade terminus
```

If you installed Terminus directly from the `.phar` file, you should upgrade using the `self:update` command:

```shell{promptUser: user}
terminus self:update
```

To confirm which version you are running:

```shell{promptUser: user}
terminus --version
```

If you have questions or concerns around Terminus, please use the [Terminus issue queue](https://github.com/pantheon-systems/terminus).
