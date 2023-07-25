import { AnimatePresence } from 'framer-motion'

import Dashboard from '@components/Dashboard'
import FloatButton from '@components/UI/FloatButton'

const DashboardLayout = ({ children }) => (
	<AnimatePresence wait>
		<Dashboard>{children}</Dashboard>
		<FloatButton />
	</AnimatePresence>
)

export const getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardLayout
