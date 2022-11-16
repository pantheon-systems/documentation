Introduction
Before You Begin
The Pantheon next-drupal-starter uses Next.js and has been tested using nodejs v16 with npm v8.

Why Use The Next.js Drupal Starter?
The next-drupal-starter is designed as a starting point to for a Next.js site that consumes data from a Drupal backend - specifically a Drupal backend configured with the pantheon_decoupled module installed.

The starter has a dependency on the @pantheon-systems/drupal-kit, which includes some helpers that maximize any available features of the Drupal backend.

Creating A New Project With The Template
There are two methods to creating a new project based on the next-drupal-starter:

Clone the starter repo directly
Use create-next-app
To clone the starter directly from GitHub, Visit the repo link https://github.com/pantheon-systems/next-drupal-starter and click on the Code button to open the clone dropdown and select your preferred method.

To create a new project using create-next-app:

npx create-next-app -e https://github.com/pantheon-systems/next-drupal-starter --use-npm

create-next-app uses the yarn package manager by default. Omit the --use-npm flag to use yarn, or keep it to use npm.

Next Steps
See the rest of the Next.js + Drupal documentation for more information on setting environment variables and customizing your new project!


Setting Environment Variables
Local Development
In order to fetch data from the Drupal instance, Next.js needs to know the endpoint at build time. For local development, the starter kit uses dotenv.

When you clone your decoupled frontend repo, create a .env.development.local file. In this file, update the BACKEND_URL and IMAGE_DOMAIN with your Drupal CMS URL, and the IMAGE_DOMAIN. If the BACKEND_URL and IMAGE_DOMAIN are the same, you can omit setting the IMAGE_DOMAIN.

For example:

BACKEND_URL=https://my-drupal-site.pantheon.site/
IMAGE_DOMAIN=my-image-cdn.site

If your site is translated and you would like the hreflang metadata set correctly, you may set FRONTEND_URL to the URL of your frontend site.

If theFRONTEND_URL is not set, it will default to the value of PANTHEON_ENVIRONMENT_URL

FRONTEND_URL=https://my-frontend-site.pantheon.site

For development, this value can be set to any string, or http://localhost:3000

Decoupled Preview
To enable Decoupled Preview, the following environment variables must be set in the .env.development.local for local dev and in the Pantheon dashboard for production or Multidev environments.

PREVIEW_SECRET
CLIENT_ID
CLIENT_SECRET

PREVIEW_SECRET - Set the Preview Secret here: {your Backend URL}/admin/structure/dp-preview-site/example_nextjs_preview
CLIENT_ID - Visible as the UUID for the “Example Consumer” here: {your Backend URL}/en/admin/config/services/consumer
CLIENT_SECRET - Set the Client Secret here: {your Backend URL}/admin/config/services/consumer/2/edit
See Implementing Preview for more information on how to implement Decoupled Preview with Next.js and Drupal.

