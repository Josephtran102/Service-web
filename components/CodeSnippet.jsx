import { atomOneLight, dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import styles from '@styles/CodeSnippet.module.scss'
import CopyButton from './CopyButton'
import { useContext } from 'react'
import { Context } from '@context/context'
import { useHorizontalScroll } from 'hooks/useHorizontalScroll'

const CodeSnippet = props => {
	const { theme, toggleTheme } = useContext(Context)

	return (
		<div className={styles.code__wrapper}>
			<CopyButton code={props.code} theme={theme} />
			<SyntaxHighlighter
				className={styles.code}
				language='bash'
				style={theme === 'dark' ? dracula : atomOneLight}
				showLineNumbers={false}
			>
				{props.code}
			</SyntaxHighlighter>
		</div>
	)
}

export default CodeSnippet
