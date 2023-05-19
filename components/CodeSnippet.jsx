import { atomOneLight, dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
const bash = require('react-syntax-highlighter/dist/esm/languages/hljs/bash').default

import styles from '@styles/CodeSnippet.module.scss'
import CopyButton from './CopyButton'
import { useContext } from 'react'
import { Context } from '@context/context'
import { useHorizontalScroll } from 'hooks/useHorizontalScroll'

SyntaxHighlighter.registerLanguage('bash', bash)

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
