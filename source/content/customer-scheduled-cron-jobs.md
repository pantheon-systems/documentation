---
title: Schedule Cron Jobs with Terminus
description: Schedule and automate specific tasks or jobs.
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [cli, automate]
cms: [--]
audience: [--]
product: [terminus]
integration: [--]
tags: [--]
showtoc: true
reviewed: 2023-06-21
---

<!-- Note to authors: this is early access content. When the feature goes to general access, this content should likely be added to the Terminus guide - or at least, the terminus commands should be, and an entry to the plugins page. 

Also, this URL has been added to addsearch to exclude it from search results. that entry should be removed when EA is over

-->

<Alert title="Early Access" type="info" icon="leaf">

Customer scheduled cron jobs are available for [Early Access](/guides/support/early-access/) participants.

While this feature is in Early Access, Pantheon's development team releases new functionality often. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about support expectations for and access to Pantheon's pre-release software.

</Alert>

The Terminus Scheduled Jobs Plugin allows customers to schedule and automate specific tasks or jobs according to their requirements. It empowers users to define the frequency, timing, and specific actions to be executed automatically, saving time and effort.

Customers can specify the desired frequency (e.g., daily, weekly, monthly, hourly), and the actions to be performed. The system then executes the scheduled jobs automatically based on the provided instructions.

## Requirements

- [Terminus](/terminus/install)

- Local clone of the [plugin repository](https://github.com/pantheon-systems/terminus-scheduled-jobs-plugin).

## Installation

To install this plugin, run the following:

```bash
terminus self:plugin:install <path to local clone>
```

For more information about installing Terminus Plugins, see [Install Plugins in our Terminus Guide](/terminus/plugins).

## Usage

The plugin uses the following syntax:

```bash
terminus scheduledjobs:<command> <site>.<env> "<job name>" "<cron command>" "<job schedule>"
```

Where:
- `<command>`: the Scheduled Jobs pPugin command. See the [Commands](/customer-scheduled-cron-jobs#commands) section for details.
- `<site>.<env>`: the site name or UUID.  Use `terminus site:list` to retrieve a list of site names and UUIDs.
- `<job name>`: a brief description of the job.
- `<cron command>`: the cron command you are scheduling. 
- `<job schedule>`: the schedule for the job.  See the [Job Schedules](/customer-scheduled-cron-jobs#job-schedules) section for details.

## Jobs

Jobs are defined as individual executions associated with a certain schedule. Listing jobs involves obtaining the schedule id.

### Job Budget

Each site has a fixed allocated budget of 300 minutes per day. This is calculated as the sum of all job durations, from the moment the job has started until it finished. There are currently no restrictions around the number of schedules that can be created for any given site. If the daily budget is exhausted, running jobs are given a 15 minute grace period after which a timeout signal will be issued. No other jobs will be created that day until midnight UTC when all budgets are reset. In calculating the budget, partial minutes are rounded up.

```bash
terminus scheduledjobs:budget:info <site>.<env>

---------------------- ------------------------ -----------
 Daily Budget Elapsed   Daily Budget Remaining   Resets In
---------------------- ------------------------ -----------
 100m                   200m                     16h11m29s
---------------------- ------------------------ -----------
```

### Job Timeout

Timeouts are dynamic and dependent on the remaining budget plus a grace period. For instance, the daily available budget at the start of the day is 300 minutes, which means the first job's timeout is 315 minutes. When a job is launched throughout the day and the remaining budget is 60 minutes, the timeout will be calculated to 75 minutes.

### Job Schedules

Job schedules are characterized as job definitions which allow setting a name for each job, a command and schedule in the UNIX cron format (https://en.wikipedia.org/wiki/Cron).

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

## Commands

### create

Creating a new schedule can be performed running the command below. This example runs an hourly job executing Drupal cron:

```bash
terminus scheduledjobs:create <site>.<env> "test-scheduled-job-hourly" "drush -vvv cron" "0 * * * *"
```

### delete

Delete an existing job. Replace `<<schedule_ID>>` with the ID of the job, which you can find using the [`list`](/customer-scheduled-cron-jobs#list) command.

```bash
terminus scheduledjobs:schedule:delete <site>.<env> <<schedule_ID>>
```

### list

Generates a list of either all schedules.

```bash{promptUser: user}{outputLines: 2-7}
terminus scheduledjobs:schedule:list <site>.<env> 

-------------------------------------- --------------------------- ------------- ---------------------------------- --------- ----------------------
 ID                                     Name                        Schedule      Command                            Status    Created At (UTC)
-------------------------------------- --------------------------- ------------- ---------------------------------- --------- ----------------------
 d178dd16-b0e3-47dc-a446-1bf4343f7fff   test-scheduled-job-hourly   0 * * * *     ls -la /files && drush -vvv cron   ENABLED   2023-05-19T07:34:26Z
-------------------------------------- --------------------------- ------------- ---------------------------------- --------- ----------------------
```

```bash{promptUser: user}{outputLines: 2-12}
terminus scheduledjobs:job:list <site>.<env> 

-------------------------------------- ------------------------------- ------------------------------- ---------
 ID                                     Start Time                      End Time                        Status
-------------------------------------- ------------------------------- ------------------------------- ---------
 ca93e729-58e8-489f-805b-f73d4102c5c0   2023-05-26 07:00:03 +0000 UTC   2023-05-26 07:01:57 +0000 UTC   SUCCESS
 808a3a84-b1c6-42cf-92c8-f0b6afe959c8   2023-05-26 06:00:03 +0000 UTC   2023-05-26 06:01:51 +0000 UTC   SUCCESS
 e0a74a62-6705-4f0c-830c-0190f57dc1c0   2023-05-26 05:00:00 +0000 UTC   2023-05-26 05:01:34 +0000 UTC   SUCCESS
 7effda3b-be2e-42b9-9093-cd373b7b3079   2023-05-26 04:00:00 +0000 UTC   2023-05-26 04:01:33 +0000 UTC   SUCCESS
 54c39e63-fcf5-41f0-81ec-4163fc1f498b   2023-05-26 03:00:00 +0000 UTC   2023-05-26 03:01:54 +0000 UTC   SUCCESS
 fdf2cf55-88f5-44a1-8a7e-d422291f625a   2023-05-26 02:00:02 +0000 UTC   2023-05-26 02:01:51 +0000 UTC   SUCCESS
-------------------------------------- ------------------------------- ------------------------------- ---------
```

### logs

View logs associated with jobs is possible by passing the job ID to the command below:

```bash
terminus scheduledjobs:job:logs <site>.<env> <job ID>
```

### pause / resume

At any point, job executions can either be paused or resumed.

```bash
terminus scheduledjobs:schedule:pause <site>.<env> <schedule_ID>
terminus scheduledjobs:schedule:resume <site>.<env> <schedule_ID>
```

## Limitations and Known Issues

### Not Implemented

- Outbound email via `sendmail` or `localhost` SMTP is not permitted. Email can still be sent via integrations with third party email providers either via their SMTP servers or API integrations.
- New Relic

### Quotas

The private beta nature of this feature comes with a quota defined at the site level as a daily runtime budget.
