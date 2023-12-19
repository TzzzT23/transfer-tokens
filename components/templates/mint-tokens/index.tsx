import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import MintTokensForm from 'components/organisms/mint-tokens-form'

import styles from './mint-tokens.module.scss'

export default function MintTokens() {
  return (
    <Row className={styles['mint']} justify='center' align='middle'>
      <Col xs={20} lg={24}>
        <Card rootClassName={styles['mint__card']}>
          <MintTokensForm />
        </Card>
      </Col>
    </Row>
  )
}
