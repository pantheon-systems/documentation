const config = {
  search: {
    enabled: true,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
    algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
    algoliaAdminKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
  }
}

module.exports = config;
