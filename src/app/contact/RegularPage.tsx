import { type FC } from 'react'
import ContactForm from './components/contactForm'
import ContactWrapper from './components/contactWrapper/contactWrapper'
import styles from './styles.module.css'

const RegularPage: FC = () => {
	return (
		<section className={styles.contact__page}>
			<div className={styles.wrapper}>
				<h1 className={styles.heading}>
					hire me for your next amazing project
				</h1>

				<div className={styles.container}>
					<div className={styles.contact__container}>
						<h2 className={styles.contact__heading}>
							Let&apos;s make somthing new, different and more meaningful or
							make thing more visual or conceptual? Just say hello!
						</h2>

						<div className={styles.contact__inner__container}>
							<ContactWrapper id='phone-number' content='+91 8921222748' />
							<ContactWrapper
								id='email_address'
								content='anoop@iiitkottayam.ac.in'
							/>
							<ContactWrapper
								id='location'
								content='Adoor, Pathanamthitta, Kerala, India'
							/>
						</div>
					</div>

					<div className={styles.form__container}>
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	)
}

export default RegularPage
