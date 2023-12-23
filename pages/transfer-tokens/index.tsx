import Head from 'next/head'
import Layout from 'layout'
import TransferTokens from 'components/templates/transfer-tokens'

import type { ReactElement } from 'react'

export default function TransferTokensPage() {
  return (
    <>
      <Head>
        <title>Transfer Tokens</title>
        <meta name='description' content='Minting tokens to a certain wallet' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TransferTokens />
    </>
  )
}

TransferTokensPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
