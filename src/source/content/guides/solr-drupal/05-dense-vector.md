---
title: Apache Solr for Drupal
subtitle: Dense Vector (AI Semantic) Search
description: Set up dense vector (AI-powered semantic) search for Drupal on Pantheon using Solr 9's DenseVectorField and the Search API Solr Dense Vector module.
contenttype: [guide]
innav: [false]
categories: [search]
cms: [drupal10, drupal11]
audience: [development]
product: [search]
integration: [--]
tags: [solr, search, modules]
contributors: [mehta-asim]
reviewed: "2026-06-25"
showtoc: true
permalink: docs/guides/pantheon-search/solr-drupal/dense-vector
editpath: solr-drupal/05-dense-vector.md
---

This guide covers the dense-vector-specific setup for semantic (AI-powered) search on a Drupal site on Pantheon, using Solr 9's DenseVectorField and the Search API Solr Dense Vector module. It assumes Pantheon Search is already set up; base Solr steps link out to [Apache Solr for Drupal](/guides/pantheon-search/solr-drupal/solr-drupal).

Traditional keyword search matches exact words. Dense vector search converts text into numerical vectors (embeddings) with an AI model, then finds content that is semantically similar. For example, a search for "fixing automobiles" matches an article about "car engine maintenance" even though the two share no keywords.

<Alert title="Beta Release" type="info">

Dense vector search on Pantheon requires Solr 9.6 or higher (Pantheon runs 9.10.0), and its setup ordering is sensitive. Follow the steps in the exact order described in this guide. Tested on Solr 9.10.0, Drupal 10.6.7 / 11.3.8.

This setup relies on **alpha** contributed modules: `search_api_solr_dense_vector` (1.0.0-alpha9) for dense vector search, and `ai_search` (2.0.0-alpha2), which is required for RAG search (Step 11). Alpha modules are unstable and can change or break between releases. Test thoroughly on non-production environments and do not rely on them for production search.

This setup uses contributed modules that Pantheon does not support, and an AI embedding provider that you bring yourself. It is not a Pantheon-supported feature.

</Alert>

## Before You Begin

Complete the base Pantheon Search setup first. This guide does not repeat it:

- Install and enable the Search API Pantheon module. Refer to [Install the Search API Pantheon Module](/guides/pantheon-search/solr-drupal/solr-drupal#install-the-search-api-pantheon-module).
- Set Solr 9 in `pantheon.yml` (requires Solr 9.6+; Pantheon runs 9.10.0). Refer to [Configure the Solr Version](/guides/pantheon-search/solr-drupal/solr-drupal#configure-the-solr-version).
- Create a Search API server and index with Title and Body fields. Refer to [Add Search Index](/guides/pantheon-search/solr-drupal/solr-drupal#add-search-index).
- Install and authenticate [Terminus](/terminus).
- Make Composer changes with [Integrated Composer](/guides/integrated-composer) (commit only `composer.json` and `composer.lock`).
- Obtain an AI embedding provider account: Google Vertex AI, OpenAI, or Google Gemini (see below).

<Alert title="Note" type="info">

**Multidev Solr 9 inheritance.** A multidev created from a Dev environment on Solr 8 inherits Solr 8 even when `pantheon.yml` specifies version 9, because the change is not detected as new. To force the upgrade, set the version to 8, commit and push, then set it to 9 and push again.

</Alert>

This guide uses Terminus. Examples use `<site>` and `<env>` placeholders. Substitute your own site name and environment (for example, `my-site.dev`).

## Choose an Embedding Provider

### Option A: Google Vertex AI

1. Go to the [Google Cloud Console](https://console.cloud.google.com) and create or select a project.
1. Enable the Vertex AI API:

   ```shell{promptUser:user}
   gcloud services enable aiplatform.googleapis.com --project=YOUR_PROJECT_ID
   ```

1. Create a service account (for example, `drupal-vertex-ai`).
1. Grant it the Vertex AI User role (`roles/aiplatform.user`).
1. Create and download a JSON key file for the service account. Keep it safe. You upload it in Step 3.

### Option B: OpenAI

1. Create an account at [platform.openai.com](https://platform.openai.com).
1. Go to [API keys](https://platform.openai.com/api-keys) and create an API key.
1. Add billing (required even for small usage). Embedding costs are negligible (around $0.01 per 1000 articles with `text-embedding-3-small`).
1. Save the API key. You store it in Step 3.

Available embedding models:

| Model | Dimensions | Cost (per 1M tokens) | Notes |
| --- | --- | --- | --- |
| `text-embedding-3-small` | 1536 | $0.02 | Recommended. Best cost/performance. |
| `text-embedding-3-large` | 3072 | $0.13 | Highest quality. Use only when needed. |
| `text-embedding-ada-002` | 1536 | $0.10 | Legacy. Avoid. |

### Option C: Google Gemini (AI Studio)

Simplest setup. A free tier is available, with no GCP project or service account needed.

1. Go to [Google AI Studio](https://aistudio.google.com).
1. Create an [API key](https://aistudio.google.com/apikey).
1. Save the API key. You store it in Step 3.

Available embedding models:

| Model | Dimensions | Cost (per 1M tokens) | Notes |
| --- | --- | --- | --- |
| `gemini-embedding-001` | 3072 | Free tier available; $0.15 paid (standard) | Stable. |
| `gemini-embedding-2-preview` | 3072 | Free tier available; $0.20 paid (standard) | Preview of `gemini-embedding-2`. Dimension bug in the Drupal provider (see Troubleshooting). |
| `gemini-embedding-2` | 3072 | Free tier available; $0.20 paid (standard) | Same dimension bug as 2-preview. |

## Step 1: Install the Dense Vector Modules

Pantheon Search and the `search_api_pantheon` module must already be installed (see Before You Begin). Add the dense-vector modules with Composer on your local clone:

```shell{promptUser:user}
# Dense vector field support (DenseVectorField, embeddings, and KNN queries)
composer require 'drupal/search_api_solr_dense_vector:^1.0@alpha'

# Core AI framework (required by the dense vector module for calling embedding APIs)
composer require drupal/ai:^1.3
```

Install the AI provider that matches your choice from Before You Begin:

```shell{promptUser:user}
# Option A: Google Vertex AI
composer require drupal/ai_provider_google_vertex

# Option B: OpenAI
composer require drupal/ai_provider_openai

# Option C: Google Gemini (AI Studio)
composer require drupal/gemini_provider
```

Commit and push via Integrated Composer (only `composer.json` and `composer.lock`), then wait for the build to finish.

## Step 2: Enable the Modules

Enable the dense-vector and AI modules with Terminus. The Key module stores API credentials securely; it is installed automatically as a dependency but must be enabled explicitly.

```shell{promptUser:user}
# Option A: Google Vertex AI
terminus drush <site>.<env> -- en search_api_solr_dense_vector ai key ai_provider_google_vertex -y

# Option B: OpenAI
terminus drush <site>.<env> -- en search_api_solr_dense_vector ai key ai_provider_openai -y

# Option C: Google Gemini
terminus drush <site>.<env> -- en search_api_solr_dense_vector ai key gemini_provider -y
```

(`search_api_pantheon` is enabled as part of the base Solr setup.)

## Step 3: Configure API Credentials

The AI provider needs credentials to call the embedding API. The Key module stores them securely. Go to **Configuration > System > Keys** (`/admin/config/system/keys`) and select **Add key**.

<Alert title="Note" type="info">

**Store API keys securely.** Use a Key provider that keeps the value out of the Drupal database:

- **Pantheon Secret (recommended).** The [Pantheon Secrets](https://www.drupal.org/project/pantheon_secrets) module is a Key-module provider: set the value with `terminus secret:site:set` (runtime type), then select **Pantheon Secret** as the key provider. The key stays in Pantheon's secure vault, never in the site database or codebase. Refer to [Use Pantheon Secrets with Drupal](/guides/secrets/drupal).
- **File.** Upload the key to `private://` and use the Key module **File** provider. Pantheon's read-only filesystem keeps it off the web-writable path.

Do not use the **Configuration** key provider for API keys: it stores the value in Drupal config (the database), where a module vulnerability could exfiltrate it. Secrets set with `terminus secret:set --type=env --scope=web` are not exposed to PHP (`$_ENV`, `$_SERVER`, `getenv()`) and cannot be read by the Key module; use the runtime type with the Pantheon Secrets module instead.

</Alert>

### Option A: Google Vertex AI

Google Vertex AI requires a service account JSON key file. Upload it to Pantheon's private file storage first:

```shell{promptUser:user}
# Switch the environment to SFTP mode (required for file uploads)
terminus connection:set <site>.<env> sftp

# Get the SFTP connection details
terminus connection:info <site>.<env> --field=sftp_command

# Upload the key file with scp (use the connection details from the command above)
scp -o Port=2222 /path/to/service-account-key.json <user>@<host>:files/private/

# Switch back to Git mode
terminus connection:set <site>.<env> git
```

Then create the key in Drupal:

- **Key name**: for example, `vertex-ai-key`
- **Key type**: Authentication
- **Key provider**: File
- **File location**: `private://service-account-key.json` (must match the filename you uploaded)

To confirm it loaded, check that the key details page shows a key length of around 2000 or more characters.

### Option B: OpenAI

- **Key name**: for example, `openai-key`
- **Key type**: Authentication
- **Key provider**: **Pantheon Secret** (recommended) or **File** (upload to `private://openai-key.txt`). See the note above. The OpenAI key looks like `sk-proj-...`.

### Option C: Google Gemini

- **Key name**: for example, `gemini-key`
- **Key type**: Authentication
- **Key provider**: **Pantheon Secret** (recommended) or **File** (upload to `private://gemini-key.txt`). See the note above. The Gemini key looks like `AIza...`.

## Step 4: Configure the AI Provider

<Alert title="Warning" type="danger">

**Order matters.** Complete this step before you configure the index processor. If the provider is not configured when you save the processor, the provider ID is stored as an empty string and embeddings silently fail during indexing.

</Alert>

### Set the Default Embedding Provider

Go to **Configuration > AI > Settings** (`/admin/config/ai/settings`) and scroll to **Vector Data Capabilities > Embedding Providers**:

1. Set **Embeddings Provider** to your chosen provider.
1. Set **Default Model** to your embedding model (for example, Gemini Embedding 001, or text-embedding-3-small).
1. Select **Save configuration**.

### Configure Provider Credentials

#### Option A: Google Vertex AI

Go to `/admin/config/ai/providers/google_vertex`:

1. Set **General Google Credentials** to the key from Step 3 (for example, `vertex-ai-key`) and **Save configuration**.
1. Under **Google Vertex Advanced Model Settings**, select **Add Embeddings Model** and fill in:
   - **Model ID**: `text-embedding-005` (Drupal's internal identifier)
   - **Project ID**: your GCP project ID (the `project_id` in the service account JSON)
   - **Location**: `us-central1` (or your preferred region)
   - **Vertex Model ID**: `text-embedding-005` (the actual Google model name)
   - **Dimensions**: `768`
1. Select **Create model**.

Verify:

```shell{promptUser:user}
terminus drush <site>.<env> -- ev '
$provider = \Drupal::service("ai.provider")->createInstance("google_vertex");
$result = $provider->embeddings("hello world", "text-embedding-005");
$normalized = $result->getNormalized();
if (is_array($normalized)) { echo "Vector length: " . count($normalized) . "\n"; }
'
```

Expected: an array of 768 floats. If empty or erroring, check credentials and project ID.

#### Option B: OpenAI

Go to `/admin/config/ai/providers/openai`, set **API Key** to the key from Step 3, and **Save configuration**. The provider auto-discovers models (text-embedding-3-small, -3-large, ada-002); no manual model creation needed.

Verify:

```shell{promptUser:user}
terminus drush <site>.<env> -- ev '
$provider = \Drupal::service("ai.provider")->createInstance("openai");
$result = $provider->embeddings("hello world", "text-embedding-3-small");
$normalized = $result->getNormalized();
if (is_array($normalized)) { echo "Vector length: " . count($normalized) . "\n"; }
'
```

Expected: an array of 1536 floats.

#### Option C: Google Gemini

Go to `/admin/config/ai/providers/gemini`, set **API Key** to the key from Step 3, and **Save configuration**. The provider auto-discovers models (gemini-embedding-001, -2-preview, -2).

<Alert title="Note" type="info">

**Known issue.** The Gemini provider returns `embeddingsVectorSize()=0` for `gemini-embedding-2-preview` and `gemini-embedding-2`, which sets `vectorDimension=0` and makes Solr reject vectors during indexing. See Troubleshooting ("incorrect vector dimensions") for the fix.

</Alert>

Verify:

```shell{promptUser:user}
terminus drush <site>.<env> -- ev '
$provider = \Drupal::service("ai.provider")->createInstance("gemini");
$result = $provider->embeddings("hello world", "models/gemini-embedding-001");
$normalized = $result->getNormalized();
if (is_array($normalized)) { echo "Vector length: " . count($normalized) . "\n"; }
'
```

Expected: an array of 3072 floats.

## Step 5: Add a Dense Vector Field to the Index

The processor generates embeddings only for fields with the Dense Vector data type. On your existing index (see [Add Search Index](/guides/pantheon-search/solr-drupal/solr-drupal#add-search-index)), go to `/admin/config/search/search-api/index/<index-name>/fields`:

1. Select **Add fields** and choose **Content > Body** (or your main content field).
1. Add it as a new field. Do not modify an existing body field. It is auto-named (for example, `body_1`).
1. Change the **Type** dropdown to **Dense Vector**.
1. Select **Save**.

The same source field can be indexed with multiple types: a Fulltext version for keyword search, a Dense Vector version for semantic search.

## Step 6: Enable Vector Search and Reranking

<Alert title="Warning" type="danger">

**Order matters.** Do this before Step 7. Saving the index edit page can reset processor settings.

</Alert>

Go to `/admin/config/search/search-api/index/<index-name>/edit`, scroll to **Dense Vector**:

1. Check **Enable vector comparison search and reranking**.
1. **Query/Re-ranking Plugin**: Pure Vector (ranks on vector similarity only).
1. **topK value**: 10 (nearest neighbors to retrieve).
1. **Minimum return**: 0.5 (filter results below 50% similarity).
1. **Minimum traverse**: 0.
1. Select **Save**.

## Step 7: Configure the Dense Vector Processor

Go to `/admin/config/search/search-api/index/<index-name>/processors`, select **Dense Vector**:

1. **AI provider**: the provider from Step 4.
1. **AI model**: the embedding model from Step 4.
1. **Similarity function**: Cosine.
1. **Content field**: the Dense Vector field from Step 5.
1. Select **Save**.

Verify the config is correct:

```shell{promptUser:user}
terminus drush <site>.<env> -- ev '
$index = \Drupal\search_api\Entity\Index::load("<index-name>");
echo print_r($index->getProcessor("solr_densevector")->getConfiguration(), TRUE);
'
```

`ai_provider` must not be empty. If it is, the provider was not configured when the processor was saved. Return to Step 4 and re-save the processor.

## Step 8: Post the Schema

Post the schema so Solr knows the DenseVectorField definition. See [Post the Schema](/guides/pantheon-search/solr-drupal/solr-drupal#post-the-schema) for the base mechanics.

```shell{promptUser:user}
terminus drush <site>.<env> -- search-api-pantheon:postSchema
```

<Alert title="Note" type="info">

Re-post the schema whenever you change the dense vector configuration (model, dimensions, or similarity function). If `postSchema` returns a 502, wait a few seconds and retry. Intermittent gateway timeouts can occur.

</Alert>

## Step 9: Index Content

Index your content (see [Index Content](/guides/pantheon-search/solr-drupal/solr-drupal#index-content)). During indexing, the processor sends each item's text to the embedding API and stores the vector in Solr.

```shell{promptUser:user}
terminus drush <site>.<env> -- search-api:index
```

Verify vectors are actually stored:

```shell{promptUser:user}
terminus drush <site>.<env> -- ev '
$index = \Drupal\search_api\Entity\Index::load("<index-name>");
$connector = $index->getServerInstance()->getBackend()->getSolrConnector();
$query = $connector->getSelectQuery();
$query->setRows(1);
$query->setFields(array("*"));
foreach ($connector->execute($query)->getDocuments() as $doc) {
  echo "Fields: " . implode(", ", array_keys($doc->getFields())) . "\n";
}
'
```

Look for a field starting with `knns_` (for example, `knns_body_1`). If absent, embeddings are not being generated. See Troubleshooting ("no knns_ field").

## Step 10: Test Semantic Search

Create a Drupal View backed by your Search API index (**Structure > Views > Add view**; under **Show**, select the index, not Content), add a page path (for example, `/vector-search`), an exposed Fulltext search filter, and Title/Body fields.

Test with queries that share meaning but not keywords with your content:

| Query | What it tests |
| --- | --- |
| fixing automobiles | Matches content about car maintenance (no keyword overlap) |
| preparing food | Matches cooking and food content |
| protecting nature | Matches environment and gardening content |

If results rank by semantic relevance rather than keyword matching, dense vector search is working.

## Step 11: RAG Search (Optional, Drupal 11.1+)

RAG (Retrieval-Augmented Generation) adds an LLM answer-generation step on top of vector search: a user asks a question, the system finds relevant content with KNN, then an LLM generates a natural language answer.

<Alert title="Alpha software" type="danger">

RAG search requires the `ai_search` module, which is **alpha** (2.0.0-alpha2). Treat RAG search as experimental, expect breaking changes between releases, and test only on non-production environments.

</Alert>

Prerequisites: Drupal 11.1+ (the `rag_search` module uses D11.1+ APIs), a working dense vector setup (Steps 1-10), and a chat-capable AI provider (OpenAI GPT-4o-mini recommended, or Gemini Pro).

Install and enable:

```shell{promptUser:user}
composer require 'drupal/ai_search:^1.3@alpha' drupal/rag_search
# commit composer.json + composer.lock, push, wait for Integrated Composer
terminus drush <site>.<env> -- en ai_search rag_search -y
```

Set the default chat provider at `/admin/config/ai`:

- **Default chat provider**: OpenAI (recommended) or Gemini
- **Default chat model**: gpt-4o-mini or gemini-2.5-flash

Configure RAG at `/admin/config/rag_search/settings`: enable the route and set a route title/path (for example, `/rag-search`); set **VDB Index** to your Search API index; fill in the question/format/CTA/no-response text. Leave cache disabled for testing.

### RAG Search Known Issues

- **Rate limiting form bug.** Hidden rate limit fields have `min=1` and `value=0`, failing HTML5 validation. Workaround: check **Enable rate limiting**, fill in the values, save. Uncheck afterward if not needed.
- **Source article links broken.** Article titles appear as links in the answer but do not resolve to the correct node URLs.
- **PHP 8.2+ serialization error.** On form rebuild: `Cannot initialize readonly property Drupal\rag_search\Form\RagSearchForm::$ragSearchProcessService`. Intermittent on a second submission; the initial answer still works.
- **Gemini free tier quota.** RAG makes both embedding and chat calls; the free tier exhausts quickly. Use OpenAI for sustained testing.

## Troubleshooting

### Error: incorrect vector dimensions

Solr returns HTTP 500 during indexing with `incorrect vector dim`. The schema's `vectorDimension` does not match the model's output, usually after switching models without re-posting the schema, or when the provider returns 0 for `embeddingsVectorSize()`.

1. Clear cache: `terminus drush <site>.<env> -- cr`
1. Re-post schema: `terminus drush <site>.<env> -- search-api-pantheon:postSchema`
1. Clear index: `terminus drush <site>.<env> -- search-api:clear <index>`
1. Reindex: `terminus drush <site>.<env> -- search-api:index`

If the provider returns 0 for dimensions (known issue with `gemini-embedding-2-preview` and `gemini-embedding-2`), set it manually at `/admin/config/search/search-api/server/<server>/solr_field_type/knn_vector_und_9_0_0/edit` (set `vectorDimension` = 3072), then re-post schema and reindex.

### Indexing succeeds but no knns_ field in Solr documents

`search-api:index` reports all items indexed, but documents have no `knns_body_1` field and search returns keyword matches. The processor is not generating embeddings. Most common causes:

- Empty `ai_provider` in the processor config (provider not configured when the processor was first saved).
- No Dense Vector field in the index (only a Fulltext body field).
- **Enable vector comparison search and reranking** not checked on the index edit page.

Fix each, then post schema, clear, and reindex.

### Search returns keyword matches instead of semantic matches

A search for "protecting nature" returns "Natural Language Processing" (keyword match on "natural") instead of a semantic match. The query is using fulltext search, not KNN.

- Confirm **Enable vector comparison search and reranking** is checked.
- Confirm **Query/Re-ranking Plugin** is Pure Vector, not hybrid.
- Confirm vectors are stored (`knns_` field present).
- Clear cache and retest.

### Provider credentials not working

The verification command returns empty or errors, and no calls appear in the provider dashboard.

- Verify the key loaded (Key details page shows key length > 0).
- Vertex AI: `project_id` in the JSON matches the model config, `aiplatform.googleapis.com` is enabled, the service account has `roles/aiplatform.user`.
- OpenAI: key starts with `sk-`, billing enabled.
- Gemini: key starts with `AIza`; test it at Google AI Studio.

## More Resources

- [Apache Solr for Drupal](/guides/pantheon-search/solr-drupal/solr-drupal)
- [Pantheon Search powered by Solr](/solr)
- [Integrated Composer](/guides/integrated-composer)
- [Terminus](/terminus)
