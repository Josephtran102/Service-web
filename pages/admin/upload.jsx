import { getAdminLayout } from '@layouts/admin'
import { UploadOutlined } from '@ant-design/icons'

const UploadComponent = () => {
	return (
		<div className='flex flex-col gap-5'>
			<a
				href='https://github.com/itrocket-am/itrocket/upload/main/public/mainnet'
				target='_blank'
				rel='noopener noreferrer'
				className='text-lg flex gap-2'
			>
				<span className='text-sky-500'>
					<UploadOutlined />
				</span>
				Upload image to<span className='text-indigo-500'>mainnet</span> folder
			</a>
			<a
				href='https://github.com/itrocket-am/itrocket/upload/main/public/testnet'
				target='_blank'
				rel='noopener noreferrer'
				className='text-lg flex gap-2'
			>
				<span className='text-sky-500'>
					<UploadOutlined />
				</span>
				Upload image to <span className='text-green-500'>testnet</span> folder
			</a>
		</div>
	)
}
UploadComponent.getLayout = getAdminLayout

export default UploadComponent
