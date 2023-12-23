import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'

import { validation } from 'utils/global/validation'
import { message } from 'utils/global'
import { WEB } from 'utils/statics/routes'
import useDebounce from 'utils/hooks/useDebounce'
import ABI from 'utils/statics/abi.json'
import styles from './mint-tokens-form.module.scss'
import type { MintTokensField } from './interface'

export default function MintTokensForm() {
  const { push, query } = useRouter()
  const [amount, setAmount] = useState<number>()
  const debouncedAmount = useDebounce(amount)
  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
    abi: ABI,
    chainId: 5,
    functionName: 'mint',
    args: [debouncedAmount],
    enabled: !!debouncedAmount,
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, error, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  function onChange({ amount }: MintTokensField) {
    setAmount(amount)
  }

  useEffect(() => {
    if (isSuccess) {
      message({ content: 'Successfully minted tokens.' })
      push(
        `${WEB.TRANSFER_TOKENS}?wallet=${query?.wallet}&amount=${debouncedAmount}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (isPrepareError || isError) {
      message({
        content: (prepareError || error)?.message as string,
        type: 'error',
      })
    }
  }, [error, isError, isPrepareError, prepareError])

  return (
    <Row
      className={styles['mint']}
      justify='center'
      align='middle'
      gutter={[0, 32]}
    >
      <Col span={24}>
        <Row gutter={[0, 8]}>
          <Col className={styles['mint--title']} span={24}>
            Minting Tokens
          </Col>
          <Col span={24} className={styles['mint--subtitle']}>
            connected wallet: {query?.wallet ?? '--'}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Form
          className={styles['mint--form']}
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          onValuesChange={onChange}
          onFinish={() => write?.()}
          autoComplete='off'
        >
          <Form.Item<MintTokensField>
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
              disabled={!write || isLoading}
              loading={isLoading}
              block
            >
              {isLoading ? 'Minting' : 'Mint'} Tokens
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
