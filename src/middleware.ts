import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


/**
 * This file is used to redirect old URLs to new ones.
 * It is used to redirect old URLs to new ones.
 * Do not add trailing slashes to the old URLs.
 * Only supports # and not ?
 */
const RedirectMap: Record<string, string> = {
  "/guides/decoupled": "/guides/decoupled/overview",
  "/release-notes/2025/09/php-runtime-gen2-new-site-default": "/release-notes/2025/09/php-runtime-gen2-new-sites",
  "/manage": "/guides/account-mgmt",
  "/release-notes": "/release-notes/1",
  "/add-site": "/guides/getstarted/addsite",
  "/add-site-dashboard": "/guides/getstarted/addsite",
  "/articles/sites/database/kill-mysql-queries": "/guides/mariadb-mysql/kill-mysql-queries",
  "/autopilot": "/guides/autopilot",
  "/backups": "/guides/backups",
  "/backups/": "/guides/backups",
  "/billing": "/guides/account-mgmt",
  "/code": "/pantheon-workflow#your-site-code-on-pantheon",
  "/composer": "/guides/integrated-composer",
  "/custom-upstreams": "/guides/custom-upstream",
  "/cygwin-windows": "/guides/local-development/cygwin-windows",
  "/drupal": "/supported-drupal",
  "/drupal-10": "/supported-drupal",
  "/drupal-9-migration": "/drupal-migration",
  "/drupal-9-migration/": "/drupal-migration",
  "/drupal-composer-managed": "/release-notes/1/",
  "/drupal-phpstorm": "/guides/local-development/drupal-phpstorm",
  "/enterprise-billing-center": "/guides/enterprise-billing-center",
  "/google": "/dns-providers",
  "/guides/account-mgmt/account/workspace": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/account-mgmt/plans/manage": "/guides/account-mgmt/plans/site-plans",
  "/guides/account-mgmt/plans/purchase": "/guides/account-mgmt/plans/site-plans",
  "/guides/account-mgmt/traffic/faq": "/guides/account-mgmt/traffic",
  "/guides/account-mgmt/traffic/measure": "/guides/account-mgmt/traffic",
  "/guides/behat": "/behat",
  "/guides/composer": "/composer",
  "/guides/composer-convert": "/composer-convert",
  "/guides/composer-convert-from-empty": "/composer-convert-from-empty",
  "/guides/decoupled-site": "/guides/decoupled/overview",
  "/guides/decoupled-site/": "/guides/decoupled/overview",
  "/guides/decoupled-sites": "/guides/decoupled/overview",
  "/guides/decoupled-sites/": "/guides/decoupled/overview",
  "/guides/decoupled-sites/considerations": "/guides/decoupled/overview/considerations",
  "/guides/decoupled-sites/considerations/": "/guides/decoupled/overview/considerations",
  "/guides/decoupled-sites/considerationsdocs.pantheon.io/guides/decoupled-sites/": "/guides/decoupled/overview",
  "/guides/decoupled-sites/faq": "/guides/decoupled/overview/faq",
  "/guides/decoupled-sites/faq/": "/guides/decoupled/overview/faq",
  "/guides/decoupled-sites/site": "/guides/decoupled/overview/site",
  "/guides/decoupled-sites/site/": "/guides/decoupled/overview/site",
  "/guides/decoupled-sites/starter-kits": "/guides/decoupled/overview/site-options",
  "/guides/decoupled-sites/support": "/guides/decoupled/overview/support",
  "/guides/decoupled-sites/support/": "/guides/decoupled/overview/support",
  "/guides/decoupled/drupal-backend-starters/build-details": "/guides/decoupled/drupal-nextjs-frontend-starters/build-details",
  "/guides/decoupled/overview/build-hooks": "/guides/decoupled/overview/manage-settings",
  "/guides/decoupled/overview/build-hooks/": "/guides/decoupled/overview/manage-settings",
  "/guides/decoupled/wp-backend-starters/build-details": "/guides/decoupled/wp-nextjs-frontend-starters/build-details",
  "/guides/drupal-advanced-page-cache": "/drupal-advanced-page-cache",
  "/guides/drupal-commerce": "/drupal-commerce",
  "/guides/drupal-from-dist": "/drupal-from-dist",
  "/guides/drupal-hosted-deprecated-upstream": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/available-updates": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/deploy": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/new-updates": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/prepare": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/switch-drupal": "/drupal-migration",
  "/guides/drupal-hosted-deprecated-upstream/troubleshooting": "/drupal-migration",
  "/guides/drupal-to-build-tools": "/drupal-to-build-tools",
  "/guides/drush/drupal-commandline": "/drupal-commandline",
  "/guides/integrated-composer/ic-faq": "/guides/integrated-composer/ic-support",
  "/guides/integrated-composer/one-click-updates": "/guides/integrated-composer/dependencies",
  "/guides/integrated-composer/private-repo-package": "/guides/integrated-composer/dependencies",
  "/guides/jenkins": "/jenkins",
  "/guides/legacy-dashboard": "/site-dashboard",
  "/guides/legacy-dashboard/account-billing": "/guides/account-mgmt/billing",
  "/guides/legacy-dashboard/add-client-site": "/add-site",
  "/guides/legacy-dashboard/create-sites": "/add-site",
  "/guides/legacy-dashboard/metrics": "/guides/account-mgmt/traffic",
  "/guides/legacy-dashboard/org-dashboard": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/legacy-dashboard/site-billing": "/guides/account-mgmt/billing",
  "/guides/legacy-dashboard/site-plan": "/guides/account-mgmt/plans/site-plans",
  "/guides/legacy-dashboard/user-dashboard": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/load-testing-with-blazemeter": "/load-testing-with-blazemeter",
  "/guides/localdev": "/guides/local-development",
  "/guides/lockr": "/lockr",
  "/guides/manual-d8-composer-to-d8": "/guides/drupal-unhosted-composer",
  "/guides/manual-d8-composer-to-d8/contrib-custom": "/guides/drupal-unhosted-composer/contrib-custom",
  "/guides/manual-d8-composer-to-d8/database": "/guides/drupal-unhosted-composer/database",
  "/guides/manual-d8-composer-to-d8/deploy-dev": "/guides/drupal-unhosted-composer/deploy-dev",
  "/guides/manual-d8-composer-to-d8/deploy-live": "/guides/drupal-unhosted-composer/deploy-live",
  "/guides/manual-d8-composer-to-d8/files": "/guides/drupal-unhosted-composer/files",
  "/guides/manual-d8-composer-to-d8/prepare": "/guides/drupal-unhosted-composer/prepare",
  "/guides/manual-d8-composer-to-d8/troubleshooting": "/guides/drupal-unhosted-composer/troubleshooting",
  "/guides/mariadb-mysql/hyperdb": "/plugins-known-issues#hyperdb",
  "/guides/new-dashboard": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/new-dashboard/settings": "/personal-settings",
  "/guides/new-dashboard/sites": "/guides/account-mgmt/workspace-sites-teams/sites",
  "/guides/new-dashboard/support": "/guides/support/",
  "/guides/new-dashboard/workspaces": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/object-cache": "/object-cache",
  "/guides/object-cache-pro": "/object-cache",
  "/guides/object-cache-pro/installing-configuring": "/object-cache/wordpress",
  "/guides/object-cache/enable-object-cache": "/object-cache",
  "/guides/object-cache/faq-object-cache": "/object-cache/faq",
  "/guides/object-cache/redis-command-line": "/object-cache/cli",
  "/guides/object-cache/remove-object-cache": "/object-cache/remove",
  "/guides/object-cache/troubleshoot-object-cache": "/object-cache/errors",
  "/guides/partial-composer": "/partial-composer",
  "/guides/pingdom-uptime-check": "/pingdom-uptime-check",
  "/guides/quickstart": "/guides/getstarted",
  "/guides/quickstart/clone-live-to-dev": "/add-site-dashboard#create-the-test-environment",
  "/guides/quickstart/code-changes": "/pantheon-workflow#make-changes-to-the-site-theme",
  "/guides/quickstart/create-new-site": "/add-site",
  "/guides/quickstart/create-test-live": "/add-site-dashboard#create-the-test-environment",
  "/guides/quickstart/next-steps": "/guides/getstarted",
  "/guides/quickstart/ui-changes": "/pantheon-workflow#make-changes-to-the-site-theme",
  "/guides/quickstart/user-dashboard": "/guides/account-mgmt/workspace-sites-teams/workspaces",
  "/guides/quickstart/workflow": "/pantheon-workflow",
  "/guides/rerouting-outbound-email": "/rerouting-outbound-email",
  "/guides/sendgrid": "/sendgrid",
  "/guides/solr-drupal/solr-drupal-9": "/guides/solr-drupal/solr-drupal",
  "/guides/switch-drupal-recommended-upstream": "/switch-drupal-recommended-upstream",
  "/guides/terminus-drupal-site-management": "/terminus-drupal-site-management",
  "/guides/trainers": "/trainers",
  "/guides/upgrade-drupal-8-ic-to-drupal-9": "/upgrade-drupal-8-ic-to-drupal-9",
  "/guides/wordpress-composer": "/guides/integrated-composer",
  "/guides/wordpress-composer/create-wp-site-composer-ci-auto-test": "/guides/build-tools/create-project",
  "/guides/wordpress-composer/multisite-configuration": "/guides/multisite/config",
  "/guides/wordpress-composer/pre-ga": "/guides/integrated-composer",
  "/guides/wordpress-composer/pre-ga/wordpress-composer-managed": "/guides/wordpress-composer/wordpress-composer-managed",
  "/guides/wordpress-composer/wordpress-composer-managed": "/guides/integrated-composer/create",
  "/guides/wordpress-composer/wordpress-ic": "/guides/integrated-composer/ic-upstreams",
  "/guides/wordpress-configurations/wordpress-s3": "/guides/wordpress-developer/wordpress-s3",
  "/headless": "/guides/decoupled",
  "/hotfixes": "/guides/git/hotfixes",
  "/local": "/guides/local-development",
  "/local-development": "/guides/local-development",
  "/metrics": "/guides/account-mgmt/traffic",
  "/migrate-wordpress": "/guides/guided/migrate",
  "/modules-plugins-known-issues": "/modules-known-issues",
  "/newrelic": "/guides/new-relic",
  "/overview": "/",
  "/overview/autopilot": "/autopilot",
  "/overview/custom-upstreams": "/custom-upstreams",
  "/overview/dashboard": "/dashboard",
  "/overview/enterprise-billing-center": "/enterprise-billing-center",
  "/overview/integrations": "/integrations",
  "/overview/newrelic": "/newrelic",
  "/overview/platform": "/platform",
  "/overview/products": "/products",
  "/overview/support": "/support",
  "/overview/workflows": "/workflows",
  "/pantheon-yml-overview": "/pantheon-yml",
  "/platform-upgrade": "/monthly-maintenance",
  "/plugins-known-issues": "/wordpress-known-issues",
  "/release-notes/2024/11/solr-module-8-1-x": "/release-notes/2024/11/solr-module-8-2-0",
  "/sftp": "/guides/sftp",
  "/shibboleth-sso": "/guides/sso/shibboleth-sso",
  "/sign-up": "/guides/getstarted/signup",
  "/sso": "/guides/sso",
  "/sso-organizations": "/guides/sso/sso-organizations",
  "/start-states/drupal-composer-managed": "/drupal-composer-managed",
  "/start-states/wordpress": "/wordpress",
  "/static-site-empty-upstream-demo": "/static-site-empty-upstream",
  "/terminus-demo": "/terminus",
  "/terminus-drupal-site-management": "/guides/drush/drupal-commandline",
  "/terminus-overview": "/terminus",
  "/upgrade-drupal-8-ic-to-drupal-9": "/upgrade-drupal-with-ic-to-latest",
  "/user-dashboard": "/guides/account-mgmt/workspace-sites-teams/workspaces#customize-a-workspace",
  "/videos/cache": "/cache",
  "/videos/drush": "/drush",
  "/videos/local": "/local",
  "/videos/migrate-wordpress": "/migrate-wordpress",
  "/videos/pantheon-yml": "/pantheon-yml-overview",
  "/videos/sftp": "/sftp",
  "/videos/static-site-empty-upstream-demo": "/static-site-empty-upstream-demo",
  "/videos/terminus": "/terminus-demo",
  "/visual-studio-code": "/guides/local-development/visual-studio-code",
  "/webops-dashboard": "/site-dashboard",
  "/wordpress": "/release-notes/1/",
  "/workflows": "/pantheon-workflow",
  "/workshops": "/certification",
  "/workspace-offboarding": "/guides/account-mgmt/workspace-sites-teams/teams#remove-a-user",
  "/wp-cfm": "/guides/wordpress-configurations/wp-cfm",
  "/guides/agcdn/agcdn-wafio": "/guides/agcdn",
  "/guides/agcdn/agcdn-features": "/guides/agcdn",
  "/lockr": "/guides/secrets/overview",
  "/pivotal-tracker": "/integrations#project-management",
  "/solr": "/pantheon-search/solr",
  "/guides/solr-drupal": "/guides/pantheon-search/solr-drupal",
  "/guides/solr-drupal/solr-drupal": "/guides/pantheon-search/solr-drupal/solr-drupal",
  "/guides/solr-drupal/custom-config": "/guides/pantheon-search/solr-drupal/custom-config",
  "/guides/solr-drupal/solr-drupal-7": "/guides/pantheon-search/solr-drupal/solr-drupal-7",
  "/guides/wordpress-developer/wordpress-solr": "/guides/pantheon-search/solr/wordpress-solr",


  // These are redirects that were not in AGCDN but discovered in the
  // process of migrating the site to Next.js.
  "/undo-commits": "/guides/git/undo-commits",
  "/security": "/guides/security",
  "/guides/account-mgmt/overages": "/guides/account-mgmt/traffic/overages",
  "/drush": "/guides/drush",
  "/guides/pivotal-tracker": "/pivotal-tracker"

/* Todo, handle wildcard redirects: https://github.com/pantheon-systems/documentation-in-nextjs/issues/59
"/docs/*": "sc=301|t=https://docs.pantheon.io$wildcard",

  "/changelog*": "/release-notes",
  "/changelog/*": "/release-notes",
*/
};

const wildcardRedirects = [
  {
    // match /docs/ or /docs
    // must start with /docs
    // ?: - non-capturing group
    // ?:\/|$ - either a slash or the end of the string or capture group
    regex: /^\/docs(?:\/|$)/,
    redirect: (wildcard: string) => `/${wildcard}`,
  },
  {
    regex: /^\/changelog(?:\/|$)/,
    redirect: (wildcard: string) => `/release-notes/${wildcard}`,
  },
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // This section handles the HTTP to HTTPS redirects for Pantheon sites.
  // See https://github.com/pantheon-systems/documentation/issues/9791
  // for more context.
  const siteMachineName = process.env.PANTHEON_SITE_MACHINE_NAME || "documentation-in-nextjs";
  const incomingProtocol = request.headers.get('x-forwarded-proto') || '';
  const policyDocSurrogateKey = request.headers.get('Policy-Doc-Surrogate-Key') || '';
  if (incomingProtocol === 'http' && policyDocSurrogateKey) {
      url.protocol = "https:";
      url.hostname = policyDocSurrogateKey;
      url.port = "";
      // Use a 301 permanent redirect
      return NextResponse.redirect(url.toString(), 301);
  }
  // Redirect newdocs.pantheon.io to docs.pantheon.io
  if (policyDocSurrogateKey.trim().endsWith('newdocs.pantheon.io')) {
    url.hostname = 'docs.pantheon.io';
    url.port = "";
    // Use a 301 permanent redirect
    return NextResponse.redirect(url.toString(), 301);
  }

  // regex to match the wildcard redirects
  // check if the url matches any of the wildcard redirects
  const wildcardRedirect = wildcardRedirects.find((redirect) =>
    redirect.regex.test(url.pathname)
  );

  if (wildcardRedirect) {
    const wildcard = url.pathname.replace(wildcardRedirect.regex, "");
    const redirectUrl = wildcardRedirect.redirect(wildcard);

    url.pathname = redirectUrl;
    return NextResponse.redirect(url, 301);
  }

  if (url.pathname in RedirectMap) {
    if (RedirectMap[url.pathname].includes("#")) {
      const hash = RedirectMap[url.pathname].split("#")[1];
      url.pathname = RedirectMap[url.pathname].split("#")[0];

      url.hash = hash;

      return NextResponse.redirect(url, 301);
    } else {
      url.pathname = RedirectMap[url.pathname];
      return NextResponse.redirect(url, 301);
    }
  }

  const response = NextResponse.next();

  // Redirect content publisher paths to separate site
  const contentpublisherPath: Record<string, string> = {
      "/content": "/",
      "/content/home": "/",
      "/content-publisher": "/",
      "/content-publisher/home": "/",
  }
    const contentpublisherFQDN = 'https://docs.content.pantheon.io';
    if (request.nextUrl.pathname in contentpublisherPath) {
    return NextResponse.redirect(new URL(contentpublisherFQDN), { status: 301 });
  }

  response.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
