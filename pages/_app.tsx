import { message } from 'antd'
import ConfigProvider from 'antd/lib/config-provider'

import 'styles/globals.scss'
import themeConfig from 'utils/configs/theme'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage<unknown, Record<string, never>> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, contextHolder] = message.useMessage()

  return (
    <ConfigProvider theme={themeConfig}>
      {contextHolder}
      {getLayout(<Component {...pageProps} />)}
    </ConfigProvider>
  )
}
