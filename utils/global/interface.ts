import type { NoticeType } from 'antd/lib/message/interface'

export interface IMessage {
  content: string
  type?: NoticeType
}
