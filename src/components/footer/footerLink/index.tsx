import styles from './styles.module.css'

type FooterLinkProps = {
	title: string
	link: string
}

const FooterLink = (props: FooterLinkProps) => {
	const { title, link } = props

	return (
		<li>
			<a target='_blank' className={styles['footer-link']} href={link}>
				{title}
			</a>
			<div className={styles.divider} />
		</li>
	)
}

export default FooterLink
