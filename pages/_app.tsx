import { message } from "antd";

import "styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage<unknown, Record<string, never>> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [_, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
