import { useContext } from 'react'

import CodeSnippet from '@components/UI/CodeSnippet'
import { Context } from '@context/context'

const CodeBlock = ({ desc, code }) => {
	const { theme } = useContext(Context)

	return (
		<div className='flex flex-col mb-1'>
			<p className='w-fit '>{desc}</p>
			<CodeSnippet theme={theme} code={code} />
		</div>
	)
}

export default CodeBlock
