import type { Validations } from './interface'

export const validation: Validations = {
  AMOUNT: [
    {
      required: true,
      message: 'The amount field is required.',
    },
    {
      validator: (_, values) => {
        if (values === 0 || values < 0) {
          return Promise.reject(
            new Error('The amount can not be zero or negative.')
          )
        }
        return Promise.resolve()
      },
    },
  ],
  WALLET_ADDRESS: [
    {
      required: true,
      message: 'The recipient wallet address field is required.',
    },
    {
      pattern: /^0x[a-fA-F0-9]{40}$/,
      message: 'Wallet format is wrong. ',
    },
  ],
}
