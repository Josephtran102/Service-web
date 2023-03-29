import { useEffect, useRef, useState } from 'react'
import styles from '@styles/Accordion.module.scss'

const Accordion = () => {
	const [isActive1, setIsActive1] = useState()
	const [isActive2, setIsActive2] = useState()
	const [isActive3, setIsActive3] = useState()
	const [height1, setHeight1] = useState(0)
	const [height2, setHeight2] = useState(0)
	const [height3, setHeight3] = useState(0)
	const ref1 = useRef(null)
	const ref2 = useRef(null)
	const ref3 = useRef(null)

	useEffect(() => {
		setHeight1(ref1.current.scrollHeight)
	}, [isActive1])

	useEffect(() => {
		setHeight2(ref2.current.scrollHeight)
	}, [isActive2])

	useEffect(() => {
		setHeight3(ref3.current.scrollHeight)
	}, [isActive3])

	return (
		<div>
			<button
				className={styles.accordion}
				onClick={() => setIsActive1(!isActive1)}
			>
				<h5 className={styles.button__heading}>About us</h5>
				<span className={styles.button__heading}>{isActive1 ? '+' : '-'}</span>
			</button>
			<div
				ref={ref1}
				className={styles.panel}
				style={isActive1 ? { maxHeight: `${height1}px` } : { maxHeight: '0' }}
			>
				<p className={styles.accordion__desc}>
					ITRocket is a team of DevOps engineers from Armenia 🇦🇲. We are crypto
					enthusiasts & node operators in various crypto ecosystems. Our main
					goal is to help millions of people effectively manage their crypto
					assets!
				</p>
			</div>

			<button
				className={styles.accordion}
				onClick={() => setIsActive2(!isActive2)}
			>
				<h5 className={styles.button__heading}>What about reliability?</h5>
				<span className={styles.button__heading}>{isActive2 ? '+' : '-'}</span>
			</button>
			<div
				ref={ref2}
				className={styles.panel}
				style={isActive2 ? { maxHeight: `${height2}px` } : { maxHeight: '0' }}
			>
				<p className={styles.accordion__desc}>
					We run nodes on dedicated servers in Europe, USA and Canada. Our team
					uses monitoring tools 24/7 with Prometheus metrics, Grafana dashboard
					and telegram bots alerting system.
				</p>
			</div>

			<button
				className={styles.accordion}
				onClick={() => setIsActive3(!isActive3)}
			>
				<h5 className={styles.button__heading}>What about security?</h5>
				<span className={styles.button__heading}>{isActive3 ? '+' : '-'}</span>
			</button>
			<div
				ref={ref3}
				className={styles.panel}
				style={isActive3 ? { maxHeight: `${height3}px` } : { maxHeight: '0' }}
			>
				<p className={styles.accordion__desc}>
					We use ssh keys to login in our servers and disable password login and
					configure a firewall with a limited connection. All our keys are
					stored in a safe place and we are using a hardware key where it is
					possible. Our priority is security and reliability of your funds.
				</p>
			</div>
		</div>
	)
}

export default Accordion
