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
}
