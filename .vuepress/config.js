module.exports = {
    title: 'Caffeinated',
    description: 'A series of Laravel packages',

    themeConfig: {
        repo: 'caffeinated/website',
        docsDir: '',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        lastUpdated: 'Last Updated',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            {
                text: 'Packages',
                items: [
                    { text: 'Modules', link: '/guide/packages/modules' },
                ]
            }
        ],

        sidebar: [
            {
                title: 'Development',
                collapsable: false,
                children: [
                    '/guide/',
                    '/guide/contributing'
                ],
            },

            {
                title: 'Packages',
                collapsable: false,
                children: [
                    '/guide/packages/modules',
                ],
            },
        ]
    }
}