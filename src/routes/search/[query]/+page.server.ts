import { voices } from '$db/voices';
import type { PageServerLoad } from './$types';
import type { WithId, Document } from 'mongodb';

export const load: PageServerLoad = async function ({ params }): Promise<{
	voices: WithId<Document>[];
	query: string;
}> {
	const data = await voices
		.find(
			{
				text: { $regex: params.query }
			},
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
		voices: structuredClone(data),
		query: params.query
	};
};
