export const opacityBlock = {
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: 0.15 }
	},
	hidden: { y: 15, opacity: 0 }
}

export const menuVariants = {
	hidden: {
		y: '-20px',
		opacity: 0
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 120,
			damping: 20,
			duration: 0.15
		}
	},
	exit: {
		y: '-20px',
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 120,
			damping: 20,
			duration: 0.15
		}
	}
}

export const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 55
}
