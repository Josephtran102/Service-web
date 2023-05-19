import { motion } from 'framer-motion'

const pageTransition = {
	duration: 0.4,
	ease: 'easeInOut'
}

const pageVariants = {
	initial: {
		opacity: 0,
		x: '2%'
	},
	in: {
		opacity: 1,
		x: 0
	},
	out: {
		opacity: 0,
		x: '-2%'
	}
}

const AnimatedSection = ({ children }) => {
	return (
		<motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
			{children}
		</motion.div>
	)
}

export default AnimatedSection
