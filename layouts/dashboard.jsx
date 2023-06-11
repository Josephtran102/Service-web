import Dashboard from '@components/Dashboard'
import { AnimatePresence } from 'framer-motion'

const DashboardLayout = ({ children }) => (
	<AnimatePresence wait>
		<Dashboard>{children}</Dashboard>
	</AnimatePresence>
)

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout
