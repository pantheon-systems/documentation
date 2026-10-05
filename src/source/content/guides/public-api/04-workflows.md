---
title: Pantheon Public API V1
subtitle: Start and monitor workflows
description: Learn how to start a workflow, such as creating a multidev environment, and poll for its completion using the Pantheon Public API.
reviewed: "2026-09-29"
contenttype: [doc]
innav: [true]
permalink: docs/guides/public-api/workflows
---

Actions that change your site, such as creating an environment, deploying code, or cloning a database, run as _workflows_. When you start one of these actions, the API returns a workflow ID immediately while the work continues in the background. To find out when the action is done, poll the workflow's status until it finishes.

This page walks through creating a [multidev environment](/guides/multidev) and waiting for it to be ready. The same pattern applies to other workflow-based actions.

The examples on this page assume your Personal Access Token is stored in the `PANTHEON_TOKEN` environment variable. See [Authenticate with the Public API](/guides/public-api/authentication).

## Start a workflow

Create a multidev environment by sending a `POST` request to the site's `multidevs` endpoint, replacing `<site_uuid>`. The request body contains:

- `siteId`: the site's UUID.
- `name`: the name of the new multidev environment. See [What are the naming conventions for branches?](/guides/multidev/multidev-faq#what-are-the-naming-conventions-for-branches) for allowed names.
- `cloneFromEnv`: the environment to copy the database and files from, such as `dev`.
- `annotation`: a short description of why the workflow was run, recorded with the workflow.

```bash{promptUser: user}
SITE_ID=<site_uuid>
curl -s -X POST "https://api.pantheon.io/v1/sites/$SITE_ID/multidevs" \
  -H "Authorization: Bearer $PANTHEON_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"siteId\": \"$SITE_ID\",
    \"name\": \"feature-x\",
    \"cloneFromEnv\": \"dev\",
    \"annotation\": \"Create multidev for feature X\"
  }"
```

The response is an object that includes the workflow's `id` and a `status` object describing the workflow. At creation, the `status` object's own `status` field is `null`, so use the `id` to poll for the current status. Save the `id` to check on the workflow's progress. To capture it in a variable with [jq](https://jqlang.org/):

```bash{promptUser: user}
WORKFLOW_ID=$(curl -s -X POST "https://api.pantheon.io/v1/sites/$SITE_ID/multidevs" \
  -H "Authorization: Bearer $PANTHEON_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"siteId\": \"$SITE_ID\",
    \"name\": \"feature-x\",
    \"cloneFromEnv\": \"dev\",
    \"annotation\": \"Create multidev for feature X\"
  }" \
  | jq -r '.id')
echo "$WORKFLOW_ID"
```

## Check a workflow's status

Request the workflow by its ID:

```bash{promptUser: user}
curl -s "https://api.pantheon.io/v1/sites/$SITE_ID/workflows/$WORKFLOW_ID" \
  -H "Authorization: Bearer $PANTHEON_TOKEN"
```

The `status` field of the response summarizes the workflow's progress:

| Status        | Meaning                                         |
|---------------|-------------------------------------------------|
| `NOT_STARTED` | The workflow is queued and hasn't started yet.  |
| `IN_PROGRESS` | The workflow is running.                        |
| `SUCCESS`     | The workflow completed successfully.            |
| `FAILED`      | The workflow failed. See the `reason` field.    |
| `CANCELED`    | The workflow was stopped before it ran, for example because of invalid input. See the `reason` field. |

The response also includes `activeDescription`, a human-readable description of the current step, and `progress`, an estimate of the workflow's progress from 0 to 100. The `reason` field is an array of strings. It is empty unless the workflow failed or was canceled. The `activeDescription` of a failed workflow can still describe the step it was attempting, so check `status` rather than relying on `activeDescription` alone.

## Poll for completion

To wait for a workflow to finish, check its status in a loop until it reaches `SUCCESS`, `FAILED`, or `CANCELED`. Wait a few seconds between requests. Creating a multidev environment can take several minutes:

```bash{promptUser: user}
while true; do
  WORKFLOW=$(curl -s "https://api.pantheon.io/v1/sites/$SITE_ID/workflows/$WORKFLOW_ID" \
    -H "Authorization: Bearer $PANTHEON_TOKEN")
  STATUS=$(echo "$WORKFLOW" | jq -r '.status')
  echo "$STATUS: $(echo "$WORKFLOW" | jq -r '.activeDescription')"
  case "$STATUS" in
    SUCCESS|FAILED|CANCELED) break ;;
  esac
  sleep 5
done
```

**Note:** It's possible for polling requests to return an error in the case of a bad response even while the workflow is still running. When writing your polling function, ensure that the loop continues on errors rather than stopping the loop.

When the loop ends, check `STATUS`. If the workflow failed or was canceled, the `reason` field explains why:

```bash{promptUser: user}
echo "$WORKFLOW" | jq '.reason'
```

Once the multidev workflow succeeds, the new environment appears in the site's `multidevEnvironmentNames` when you [get site information](/guides/public-api/sites).

## More information

- [Pantheon Public API reference](https://api.pantheon.io/docs)
- [Multidev](/guides/multidev)
