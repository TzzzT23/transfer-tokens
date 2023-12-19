import Head from 'next/head'
import Layout from 'layout'
import MintTokens from 'components/templates/mint-tokens'

import type { ReactElement } from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mint Tokens</title>
        <meta name='description' content='Minting tokens to a certain wallet' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MintTokens />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
