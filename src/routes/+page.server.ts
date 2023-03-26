import { voices } from '$db/voices';
import type { PageServerLoad } from './$types';
import type { WithId, Document } from 'mongodb';

export const load: PageServerLoad = async function (): Promise<{
	voices: WithId<Document>[];
}> {
	const data = await voices
		.find(
			{},
			{
				limit: 50,
				projection: {
					url: 1,
					text: 1
				}
			}
		)
		.toArray();
	console.log('data', data);
	return {
		voices: structuredClone(data)
	};
};
