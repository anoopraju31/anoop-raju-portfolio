import { FiArrowUpRight } from 'react-icons/fi'
import styles from './styles.module.css'

type ScrollTextProps = {
	text: string
}

const ScrollText = (props: ScrollTextProps) => {
	const { text } = props

	return (
		<div className={styles.container}>
			<span className={styles.text}>{text}</span>
			<div className={styles.seperator}>
				<div className={styles.arrowBadge}>
					<FiArrowUpRight className={styles.arrowIcon} />
				</div>
			</div>
		</div>
	)
}

export default ScrollText
