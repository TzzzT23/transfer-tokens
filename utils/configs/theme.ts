import type { ThemeConfig } from 'antd'

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#EA6601',
    fontSize: 14,
    borderRadius: 8,
  },
  components: {
    Button: {
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 36,
    },
    Form: {
      controlHeight: 36,
    },
    Input: {
      controlHeight: 36,
      colorBorder: '#CCCCCC',
      colorText: '#272729',
    },
  },
}

export default themeConfig
