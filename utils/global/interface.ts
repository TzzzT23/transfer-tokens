import type { NoticeType } from 'antd/lib/message/interface'
import type { Rule } from 'antd/lib/form'

export interface IMessage {
  content: string
  type?: NoticeType
}

type ValidationKeys = 'AMOUNT'

export type Validations = Record<ValidationKeys, Rule[]>
