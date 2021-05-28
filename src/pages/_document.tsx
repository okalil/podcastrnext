import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        const setInitialTheme = `function getUserPreference() {
            if(window.localStorage.getItem('theme')) {
                return window.localStorage.getItem('theme')
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
        document.body.dataset.theme = getUserPreference();`;

        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>

                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}