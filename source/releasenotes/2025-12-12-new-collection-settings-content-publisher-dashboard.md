---
title: "New collection settings added to the Content Publisher dashboard"
published_date: "2025-12-12"
categories: [content-publisher]
---
## Key Changes 
Collection metadata and publishing configurations are now managed via the [Content Dashboard](https://content.pantheon.io):
* Go to "**Collection Settings** > **Metadata**" in the Content Dashboard to manage custom metadata fields for a given collection. 
  * Previously, this was done from the Google Docs Add-on via "**About this collection** > **Page Metadata**". 
  * New metadata field capabilities have also been added, such as ordering fields or specifying both their label and their machine name independently. 
* Use the entirely new "**Collection Settings** > **Publishing**" tab in the Content Dashboard to enable the following within the Google Docs Add-on for contributors across this collection:
  * Sections
  * Google Docs tabs 

For details, see [related documentation](https://docs.content.pantheon.io/collection-settings).

## Bug fixes and other minor updates
* Starter kits and all Next.js applications have been updated priorly to mitigate CVE …..
* The Ingest API previously only authorized Google accounts, but now accepts any authenticated user.
* Refactored the sign-in and sign-up experience for a smoother onboarding process including email verification. Country, state and other dropdowns now support keyboard navigation.
* Helper text added to collection creation for clarity. The playground guide also got improved with simplified navigation.
* SDK status endpoint no longer exposes version information for security reasons.
* Fixed glitch in component editor text fields that prevented input on some occasions.
* Disconnecting documents from collection now works as expected for content contributors.
* Fixed infinite page reload when navigating from add-ons to the collection structure.
* Preview now allows comparing published and submitted versions when reviewing content sent for approval.
* Permission menu entry in the Content Publisher dashboard is hidden for first-time users until a collection is created.
* The smart component add-on interface now clearly indicates when no components are configured, avoiding users to lose time trying to use a capability not yet configured.
* As well as several minor UX fixes and improvements
