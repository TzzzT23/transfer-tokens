import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'

import { message } from 'utils/global'
import { validation } from 'utils/global/validation'
import styles from './mint-tokens-form.module.scss'
import type { MintField } from './interface'

export default function MintTokensForm() {
  function onSubmit({ amount }: MintField) {
    message({ content: `entered amount is ${amount}` })
    // updateStep(2)
  }

  return (
    <Row
      className={styles['mint']}
      justify='center'
      align='middle'
      gutter={[0, 32]}
    >
      <Col className={styles['mint--title']} span={24}>
        Minting Tokens
      </Col>
      <Col span={24}>
        <Form
          className={styles['mint--form']}
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          onFinish={onSubmit}
          autoComplete='off'
        >
          <Form.Item<MintField>
            label='Amount'
            name='amount'
            rules={validation.AMOUNT}
            required
          >
            <InputNumber placeholder='Enter token amounts' controls={false} />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles['mint--button']}
              type='primary'
              htmlType='submit'
              block
            >
              Mint Tokens
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
