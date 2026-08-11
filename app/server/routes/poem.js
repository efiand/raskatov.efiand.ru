import { getWorkPage } from '#server/lib/work-page.js';

const poemRoute = {
	/** @type {RouteMethod} */
	async GET({ id, isManuscript }) {
		return {
			page: await getWorkPage({
				book: 'poem',
				description: 'Стихотворение Андрея Раскатова',
				id,
				isManuscript,
			}),
		};
	},
};

export { poemRoute };
