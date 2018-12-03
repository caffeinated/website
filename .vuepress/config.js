module.exports = {
    title: 'Caffeinated',
    description: 'A series of Laravel packages',
    ga: 'UA-55914671-3',

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
                title: 'Prologue',
                collapsable: false,
                children: [
                    '/guide/',
                    '/guide/codeofconduct',
                    '/guide/contributing',
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
    },

    plugins: ['@vuepress/google-analytics'],
}