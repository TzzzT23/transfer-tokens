import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import TransferTokensForm from 'components/organisms/transfer-tokens-form'

import styles from './transfer-tokens.module.scss'

export default function TransferTokens() {
  return (
    <Row className={styles['tokens']} justify='center' align='middle'>
      <Col xs={22} lg={24}>
        <Card rootClassName={styles['tokens__card']}>
          <TransferTokensForm />
        </Card>
      </Col>
    </Row>
  )
}
