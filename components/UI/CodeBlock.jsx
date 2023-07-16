import { useContext } from 'react'

import CodeSnippet from '@components/UI/CodeSnippet'
import { Context } from '@context/context'

const CodeBlock = ({ desc, code }) => {
	const { theme } = useContext(Context)

	return (
		<div className='flex flex-col'>
			<p className='w-fit text-slate-700  dark:text-white'>{desc}</p>
			<CodeSnippet theme={theme} code={code} />
		</div>
	)
}

export default CodeBlock
