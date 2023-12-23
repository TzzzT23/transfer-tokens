import styles from './layout.module.scss'
import type { LayoutProps } from './interface'

export default function Layout({ children }: LayoutProps) {
  return <main className={styles['layout']}>{children}</main>
}
