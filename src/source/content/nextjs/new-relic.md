---
title: How to install New Relic Monitoring on Next.js on Pantheon
description: How to install and use New Relic on Pantheon Next.js sites
reviewed: "2026-10-05"
contenttype: [doc]
innav: [true]
audience: [development]
product: [--]
integration: [--]
permalink: docs/nextjs/new-relic
---

Use this guide when you need application-level traces, metrics, or errors for a Next.js site running on Pantheon.

<Alert title="Note" type="info">

 **Current support boundary:** Pantheon provides platform-level signals for your Next.js environments, including environment and runtime logs, workflow/build information, and the dashboard and CLI surfaces used to inspect them. Pantheon does not currently provide the automatic New Relic integration that is available for WordPress and Drupal, and Pantheon does not provide a complete native OpenTelemetry integration for Next.js.

</Alert>

## When to bring your own monitoring

Customer-managed monitoring is useful when you need to answer questions that platform signals alone cannot answer, such as:

- Which application route, server action, API call, or external dependency is slow?

- Where does a request spend time inside the Next.js process?

- Which release introduced an error or latency regression?

- Can you correlate a browser interaction with server-side work and a downstream API or CMS request?

- Do you need dashboards, alerting, retention, or cross-service traces in an existing observability platform?


Pantheon platform signals and application telemetry complement one another. Start with the platform signals to determine whether the symptom is associated with a deployment, build, environment, runtime, or platform event. Add application instrumentation when you need visibility inside your code or across services.

## What Pantheon provides and what you configure

| Signal or capability                              | Pantheon-provided                                                                     | Customer-configured in the application                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Environment, runtime, and workflow/build evidence | Yes. Use the Pantheon dashboard and CLI/logging surfaces.                             | No application agent is required to view these signals.                                     |
| Application logs written by the Next.js process   | The platform captures runtime output according to the environment's logging behavior. | You decide what to log, how to structure it, and whether to forward it elsewhere.           |
| Server-side traces and spans                      | No automatic Next.js APM or tracing agent is included.                                | Add an instrumentation library or OpenTelemetry SDK and configure an exporter or collector. |
| Browser performance and real-user monitoring      | Not automatically provided for the Next.js application.                               | Add the browser agent or RUM SDK supplied by your monitoring vendor.                        |
| Cross-service trace context                       | Not automatically configured across your application and downstream services.         | Configure W3C trace-context propagation and instrument the services you control.            |
| Dashboards, alerts, retention, and custom SLOs    | Pantheon provides platform surfaces; the scope varies by product capability.          | Configure these in your monitoring provider for customer-managed telemetry.                 |

For the current distinction between Next.js and CMS hosting, see [Comparison to CMS Hosting and other Considerations](https://docs.pantheon.io/nextjs/comparison-to-cms-hosting). Pantheon documents automatic New Relic integration for WordPress and Drupal, but explicitly notes that the same integration is not yet available for Next.js.

## Recommended setup pattern

The safest general pattern is:

1. Instrument the Node.js side of your Next.js application with an application-owned SDK.

2. Export telemetry over OTLP/HTTPS to your provider or to an OpenTelemetry Collector that you operate or contract for.

3. Store credentials such as ingest keys in Pantheon Secrets Manager rather than committing them to the repository.

4. Give each environment a stable service name and an environment attribute so that Dev, Test, Live, and Multidev data do not mix.

5. Start with traces and error correlation. Add metrics and logs only after confirming their cost, volume, and retention behavior with your provider.

6. Test the setup in a non-Live environment before enabling it for production traffic.


Instrumentation is application code. A package that works locally does not become a Pantheon-provided integration simply because the application is deployed to Pantheon.

## New Relic: customer-managed OTLP export

### Support status

**Practical customer-managed approach — not a Pantheon native integration.** New Relic accepts OpenTelemetry data, and its documentation provides a Node.js OTLP exporter pattern. The example below follows the current Next.js instrumentation model and sends server-side traces directly to New Relic.

This approach requires a New Relic account, an ingest license key, and customer-owned configuration. Pantheon Support can help determine whether the application is starting and producing runtime output, but New Relic account configuration, sampling, dashboards, data retention, and vendor-specific query behavior remain customer-owned.

### 1. Install the application dependencies

Use versions that are compatible with the Node.js version and Next.js version selected by your project. Keep these packages pinned or lock them through your normal dependency workflow.

```bash
npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources @opentelemetry/sdk-node @opentelemetry/semantic-conventions
```

### 2. Create instrumentation.ts
This file makes sure the node instrumentation is only called when the `nodejs` runtime is used.

```ts
// instrumentation.ts
export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		// Dynamically import the Node-specific setup
		await import('./instrumentation.node');
	}
	if (process.env.NEXT_RUNTIME === 'edge') {
		// Optional: await import('./instrumentation.edge');
	}
}
```

### 3. Register Node.js instrumentation

Create `instrumentation.node.ts` (or the JavaScript equivalent) in the location required by your Next.js version. This example instruments the Node.js runtime and exports traces to New Relic over OTLP/HTTP.

```ts
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const serviceName = process.env.OTEL_SERVICE_NAME ?? 'nextjs-app'
const exporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
  headers: {
    'api-key': process.env.NEW_RELIC_LICENSE_KEY ?? '',
  },
})

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
  }),
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()

process.on('SIGTERM', () => {
  sdk.shutdown().finally(() => process.exit(0))
})
```

The exact initialization file name, package APIs, and supported runtime behavior can change with Next.js and OpenTelemetry releases. Treat this as a starting point, not a Pantheon-certified adapter.
### 3. Configure secrets and environment variables

Set these values with [Secrets Manager](/nextjs/environment-variables), for example `terminus secret:site:set <site>.<env> NEW_RELIC_LICENSE_KEY <your-license-key> --type=env --scope=web`. Do not commit the license key to Git. Secrets take effect on the next build, so rebuild after setting them.

```text
OTEL_SERVICE_NAME=nextjs-app-live
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://otlp.nr-data.net:4318/v1/traces
NEW_RELIC_LICENSE_KEY=<customer-managed-secret>
```

Use the endpoint and authentication format documented for your New Relic account and region. If your account uses a different ingest region or provider configuration, follow that provider's current instructions instead of copying the endpoint blindly.

### 4. Verify the data path

Deploy the instrumentation to a non-Live environment and generate traffic. Then verify, in order:

- The application starts successfully after the instrumentation is enabled.

- The Pantheon runtime logs do not show exporter initialization or connection errors.

- The New Relic application receives traces with the expected service name and environment attributes.

- Trace volume and latency are acceptable before enabling additional instrumentations or higher sampling.


A request reaching the application does not guarantee that a trace was exported. Exporter credentials, endpoint reachability, sampling, process shutdown behavior, and vendor-side ingestion can each affect what appears in New Relic.

## Other practical options

### OpenTelemetry Collector

**Practical, customer-managed option.** Send OTLP data from the application to a collector that your team operates or obtains from an observability provider, then forward it to one or more backends. A collector can centralize authentication, sampling, redaction, routing, and fan-out.

Pantheon does not host or manage that collector as part of the Next.js service. Your team is responsible for its availability, network access, credentials, upgrades, and cost.

### Other OTLP-compatible backends

**Potentially practical, but not Pantheon-validated.** The same application pattern can be adapted for an observability backend that accepts OTLP traces, metrics, or logs. Check the provider's current Node.js and Next.js guidance for:

- OTLP/HTTP or OTLP/gRPC endpoint format.

- Authentication headers and regional endpoints.

- Whether the provider expects traces, metrics, logs, or all three.

- Browser/RUM setup, which is separate from Node.js instrumentation.

- Sampling, cardinality, retention, and data-residency controls.


Do not describe a provider as supported by Pantheon unless Pantheon has published and tested that integration.

## What is supported, practical, or experimental?

|Approach|Status in this guide|What you own|
|---|---|---|
|Pantheon dashboard, workflow/build information, and runtime logs|Supported platform evidence|None beyond using the documented Pantheon surfaces.|
|New Relic through customer-configured OTLP export|Practical customer-managed approach|New Relic account, credentials, instrumentation, endpoint, sampling, dashboards, and support relationship.|
|OpenTelemetry SDK plus your own collector|Practical customer-managed option|SDK compatibility, collector operations, network path, security, routing, cost, and backend.|
|Direct export to another OTLP-compatible provider|Potentially practical; provider-specific|Provider compatibility and all vendor configuration.|
|Pantheon-provisioned New Relic for Next.js|Not currently available|Do not document or promise this as a current feature.|
|Pantheon-native OpenTelemetry integration|Under evaluation; not a committed feature|Do not rely on it for current production requirements.|
|Unpinned packages or copied examples from older Next.js/OpenTelemetry releases|Version-sensitive and experimental|Validate against the project's Node.js and Next.js versions before deployment.|

## Troubleshooting

### No traces or metrics appear

1. Confirm the application starts and continues serving requests after instrumentation is enabled.

2. Check Pantheon runtime output for missing secrets, invalid endpoint URLs, TLS errors, authentication failures, or exporter initialization errors.

3. Confirm that the exporter is configured for the correct signal type. A trace exporter does not automatically export metrics or logs.

4. Generate fresh traffic in the environment being inspected. Some providers do not display a new service until data has been ingested.

5. Check provider-side ingestion status, service name, environment attributes, sampling, and account permissions.

6. Test from a non-Live environment before changing production sampling or retention settings.


### The application becomes slow or fails to start

Treat instrumentation as a possible application change. Compare startup time, memory use, and error behavior with instrumentation disabled. Reduce auto-instrumentation, sampling, export frequency, or payload size, and verify that the exporter does not block the request path.

If the app cannot start without the instrumentation, collect the failing build/runtime evidence and the relevant dependency versions before opening a Pantheon Support request.

### Traces stop at the application boundary

That usually means the downstream service is not instrumented, trace context is not propagated, or the downstream system does not preserve the incoming W3C trace headers. Check propagation and the instrumentation configuration for every service in the request path.

### Is this a Pantheon issue or an application issue?

- **Application-owned:** instrumentation code, package compatibility, exporter credentials, provider configuration, sampling, dashboards, and downstream trace propagation.

- **Pantheon-owned:** inability to deploy or start a valid application, missing or malformed platform runtime evidence, or a suspected platform incident affecting the environment.

- **Shared investigation:** collect timestamps in UTC, environment name, deployment/build identifier, request path, runtime log excerpts, provider service name, and a trace or request identifier when available.


When contacting Pantheon Support, do not include license keys, bearer tokens, or other secrets. Include the smallest reproducible example and identify whether the symptom occurs in one environment or across multiple environments.

## Related documentation

- [Next.js Overview](https://docs.pantheon.io/nextjs)

- [Comparison to CMS Hosting and other Considerations](https://docs.pantheon.io/nextjs/comparison-to-cms-hosting)

- [Environment Log Files on Pantheon](https://docs.pantheon.io/guides/logs-pantheon)

- [Secrets Manager](https://docs.pantheon.io/guides/secrets)

- [New Relic Performance Monitoring on Pantheon](https://docs.pantheon.io/guides/new-relic) — applies to the supported CMS integration, not to automatic Next.js APM

- [New Relic: OpenTelemetry for full-stack JavaScript](https://newrelic.com/blog/apm/opentelemetry-full-stack-javascript)