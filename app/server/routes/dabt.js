import { getWorkPage } from '#server/lib/work-page.js';

const dabtRoute = {
	/** @type {RouteMethod} */
	async GET({ id, isManuscript }) {
		return {
			page: await getWorkPage({
				book: 'dabt',
				description: 'Современная бытовая сказка о деде Андрее и бабке Тане',
				id,
				isManuscript,
			}),
		};
	},
};

export { dabtRoute };
