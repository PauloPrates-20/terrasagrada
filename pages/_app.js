import Head from 'next/head'

import Layout from '@/components/Layout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Terra Sagrada</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='shortcut icon' href='/images/d20.png' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
