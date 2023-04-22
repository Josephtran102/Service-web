import {
	atomOneLight,
	dracula,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from '@styles/CodeSnippet.module.scss'
import CopyButton from './CopyButton'
import { useContext } from 'react'
import { Context } from '@context/context'

const CodeSnippet = props => {
	const { theme, toggleTheme } = useContext(Context)

	const getTheme = () => {
		switch (theme) {
			case 'dark':
				return dracula
			case 'light':
				return atomOneLight
			default:
				return atomOneLight
		}
	}

	return (
		<div className={styles.code__wrapper}>
			<CopyButton code={props.code} theme={theme} />
			<SyntaxHighlighter
				className={styles.code}
				language='bash'
				style={getTheme()}
				showLineNumbers={false}
			>
				{props.code}
			</SyntaxHighlighter>
		</div>
	)
}

export default CodeSnippet
