---
contenttype: [partial]
categories: [accounts]
cms: [--]
product: [dashboard]
integration: [--]
tags: [--]
reviewed: ""
---

Pantheon Dashboard users are forcibly logged out after 14 hours and must log back in after session expiry. 

Terminus sessions rely on a local cookie token for authorization and that cookie is renewed based on activity over 24 hours until it maxes out after 30 days - at which point, the user must re-authenticate Terminus by running `terminus auth:login`.