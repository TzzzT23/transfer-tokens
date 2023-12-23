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
import Input from 'antd/lib/input'

import { validation } from 'utils/global/validation'
import { message } from 'utils/global'
import useDebounce from 'utils/hooks/useDebounce'
import ABI from 'utils/statics/abi.json'
import styles from './transfer-tokens-form.module.scss'
import type { TransferTokensField } from './interface'

export default function TransferTokensForm() {
  const { query } = useRouter()
  const [address, setAddress] = useState<string>()
  const debouncedAddress = useDebounce(address)
  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_WALLET_ADDRESS as `0x${string}`,
    abi: ABI,
    chainId: 5,
    functionName: 'transfer(address, uint256)',
    args: [debouncedAddress, parseInt(query?.amount as string)],
    enabled: !!debouncedAddress,
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, error, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  function onChange({ walletAddress }: TransferTokensField) {
    setAddress(walletAddress)
  }

  useEffect(() => {
    if (isSuccess) {
      message({ content: 'Successfully transferred tokens.' })
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
          <Col className={styles['transfer--title']} span={24}>
            Transfer Tokens
          </Col>
          <Col span={24} className={styles['transfer--subtitle']}>
            connected wallet: {query?.wallet ?? '--'}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Form
          className={styles['transfer--form']}
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          onValuesChange={onChange}
          onFinish={() => write?.()}
          autoComplete='off'
        >
          <Form.Item<TransferTokensField>
            label='Wallet Address'
            name='walletAddress'
            rules={validation.WALLET_ADDRESS}
            required
          >
            <Input placeholder='Enter recipient wallet address' />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles['transfer--button']}
              type='primary'
              htmlType='submit'
              disabled={!write || isLoading}
              loading={isLoading}
              block
            >
              {isLoading ? 'Transferring' : 'Transfer'} Tokens
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
