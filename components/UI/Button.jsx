import Link from 'next/link'
import styles from '@styles/Card.module.scss'

const Button = ({ href, theme, children }) => {
	return (
		<Link href={href} className={theme === 'light' ? styles.buttonExplorer : styles.buttonExplorer_dark}>
			{children}
		</Link>
	)
}

export default Button
