'use server'

import { client } from '@/sanity/lib/client'

export const submitContactMe = async (data: any) => {
	const updatedData = {
		_type: 'contactMe',
		...data
	}

	console.log(updatedData)
	try {
		const response = await client.create(updatedData)
		return response
	} catch (error) {
		console.log(error)
	}
}
