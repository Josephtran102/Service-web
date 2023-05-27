import Header from '@components/Header'
import { Button } from 'antd'
import Link from 'next/link'

const FourOhFour = () => {
	return (
		<>
			<Header />

			<div
				className='flex items-center justify-center w-full flex-col gap-3'
				style={{ height: 'calc(100vh - 65px)' }}
			>
				<p className='text-black font-medium text-xl'>404 error.</p>
				<h1>Seems like the page you're searching for doesn't exist. </h1>
				<Button type='primary'>
					<Link href='/'>Go home</Link>
				</Button>
			</div>
		</>
	)
}

export default FourOhFour
