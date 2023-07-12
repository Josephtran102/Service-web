import styles from '@styles/Spinner.module.scss'

const Spinner = () => {
	return (
		<div className={styles.loaderBG}>
			<div className={styles.loader}>
				<div className={`${styles.inner} ${styles.one}`}></div>
				<div className={`${styles.inner} ${styles.two}`}></div>
				<div className={`${styles.inner} ${styles.three}`}></div>
			</div>
		</div>
	)
}

export default Spinner
