module.exports = {
    extends: 'lighthouse:default',
    settings: {
        output: ['html'],
        skipAudits: ['is-cralwable'],
        useThrottling: true,
        onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'seo'
        ],
    },
}