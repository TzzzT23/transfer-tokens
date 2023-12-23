import Head from 'next/head'
import Layout from 'layout'
import ConnectWallet from 'components/templates/connect-wallet'

import type { ReactElement } from 'react'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Connect Wallet</title>
        <meta
          name='description'
          content='Connecting to wallet using metamask'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ConnectWallet />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
