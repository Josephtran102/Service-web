import { dracula, CopyBlock, atomOneLight } from 'react-code-blocks'
import styles from '@styles/CodeSnippet.module.scss'

const CodeSnippet = props => {
	return (
		<div
			className={styles.code__wrapper}
			style={{
				border: '1px solid #82828244',
				borderRadius: '4px',
			}}
		>
			<CopyBlock
				text={props.code}
				language='bash'
				showLineNumbers={false}
				theme={props.theme === 'light' ? atomOneLight : dracula}
				codeBlock
			/>
		</div>
	)
}

export default CodeSnippet
