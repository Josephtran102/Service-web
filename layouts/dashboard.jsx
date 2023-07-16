import { FloatButton } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { UpOutlined } from '@ant-design/icons'

import Dashboard from '@components/Dashboard'

const DashboardLayout = ({ children }) => (
	<AnimatePresence wait>
		<Dashboard>{children}</Dashboard>
		<FloatButton.BackTop icon={<UpOutlined />} />
	</AnimatePresence>
)

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout
