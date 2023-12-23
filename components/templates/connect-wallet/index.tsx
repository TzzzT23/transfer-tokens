import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'

import { message } from 'utils/global'
import { WEB } from 'utils/statics/routes'
import styles from './connect-wallet.module.scss'

export default function ConnectWallet() {
  const { push } = useRouter()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })

  useEffect(() => {
    if (isConnected) {
      message({ content: `Connected wallet address is ${address}` })
      push(`${WEB.MINT_TOKENS}?wallet=${address}`)
    }
  }, [isConnected, address])

  return (
    <Row className={styles['connect']} justify='center' align='middle'>
      <Col xs={22} lg={24}>
        <Button onClick={() => connect()} type='primary' size='large'>
          Connect Wallet
        </Button>
      </Col>
    </Row>
  )
}
