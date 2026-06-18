---
title: Schedule Cron Jobs with Terminus
description: Schedule and automate specific tasks or jobs.
contributors: [wordsmither,rachelwhitton,jazzsequence]
contenttype: [doc]
innav: [true]
categories: [cli, automate]
cms: [--]
audience: [--]
product: [terminus]
integration: [--]
tags: [--]
showtoc: true
reviewed: 2026-06-11
---

The [Terminus](/terminus) Scheduled Jobs Plugin allows customers to schedule and automate specific cron jobs according to their requirements. You can specify the desired frequency (e.g., daily, weekly, monthly, hourly), and the actions to be performed. The system then executes the scheduled jobs automatically based on the provided instructions.

## Requirements

- [Terminus](/terminus/install)

## Installation

To install this plugin, run the following:

```bash
terminus self:plugin:install pantheon-systems/terminus-scheduled-jobs-plugin
```

For more information about installing Terminus Plugins, see [Install Plugins](/terminus/plugins) in our Terminus Guide.

## Schedules and Jobs

The plugin uses two distinct concepts:

- **Schedule**: the definition of a recurring task — its name, the command to run, and the cron expression that determines frequency. Each schedule has a unique `<schedule_ID>`. Commands that
  manage schedules (`schedule:create`, `schedule:pause`, `schedule:resume`, `schedule:delete`) require a `<schedule_ID>`.

- **Job**: a single execution of a schedule. Each time a schedule fires, it produces a job with its own `<job_ID>`. Commands that inspect executions (`job:list`, `job:logs`) require a `<job_ID>`.

Use `terminus scheduledjobs:schedule:list <site>.<env>` to retrieve schedule IDs, and `terminus scheduledjobs:job:list <site>.<env>` to retrieve job IDs.

## Usage

To create a new scheduled job:

```bash
terminus scheduledjobs:schedule:create <site>.<env> "<job_name>" "<cron_command>" "<cron_schedule>"
```

Where:

- `<site>.<env>`: the site name or UUID.  Use `terminus site:list` to retrieve a list of site names and UUIDs.

- `<job_name>`: a brief description of the job.

- `<cron_command>`: the cron command you are scheduling. The following commands cannot be used:
  - Outbound email via `sendmail` or `localhost` SMTP is not permitted. Email can still be sent via integrations with third party email providers either via their SMTP servers or API integrations.
  - New Relic

- `<cron_schedule>`: the schedule for the job.  See [this Wikipedia page](https://en.wikipedia.org/wiki/Cron) for more information about cron schedules.

### Job Schedules

Job schedules are characterized as job definitions which allow setting a name for each job, a command and schedule in the [UNIX cron](https://en.wikipedia.org/wiki/Cron) format.

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <command to execute>
```

### Jobs "Budget"

Each site has a fixed allocated budget of 300 minutes per day. This is calculated as the sum of all job durations, from the moment the job has started until it finished. 

There are currently no restrictions around the number of schedules that can be created for any given site. If the daily budget is exhausted, running jobs are given a 15 minute grace period after which a timeout signal will be issued. No other jobs will be created that day until midnight UTC when all budgets are reset. In calculating the budget, partial minutes are rounded up.

### Job Timeouts

Timeouts are dynamic and dependent on the remaining budget plus the 15 minute grace period. For instance, the daily available budget at the start of the day is 300 minutes, which means the first job's timeout is 315 minutes. When a job is launched throughout the day and the remaining budget is 60 minutes, the timeout will be calculated to 75 minutes.

## Commands

For a full list of available commands, see the [Terminus Scheduled Jobs Plugin
  documentation](https://github.com/pantheon-systems/terminus-scheduled-jobs-plugin).

