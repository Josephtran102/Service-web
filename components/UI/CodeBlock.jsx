import CodeSnippet from '@components/UI/CodeSnippet'
import { useContext } from 'react'
import { Context } from '@context/context'

const GenerateCode = (desc, code) => {
	const { theme } = useContext(Context)

	return (
		<div className='flex flex-col'>
			<p className='w-fit text-slate-700'>{desc}</p>
			<CodeSnippet theme={theme} code={code} />
		</div>
	)
}

export default GenerateCode
