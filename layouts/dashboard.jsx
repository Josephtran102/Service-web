import Dashboard from '@components/Dashboard'
import { FloatButton } from 'antd'
import { AnimatePresence } from 'framer-motion'

const DashboardLayout = ({ children }) => (
	<AnimatePresence wait>
		<Dashboard>{children}</Dashboard>
		<FloatButton.BackTop />
	</AnimatePresence>
)

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout
