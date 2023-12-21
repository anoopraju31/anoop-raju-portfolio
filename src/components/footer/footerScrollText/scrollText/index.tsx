import styles from './styles.module.css'

type ScrollTextProps = {
	text: string
}

const ScrollText = (props: ScrollTextProps) => {
	const { text } = props
	return (
		<div className={styles.container}>
			<h2> {text} </h2>
			<div className={styles.seperator} />
		</div>
	)
}

export default ScrollText
