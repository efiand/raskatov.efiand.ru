import { renderErrorPage } from '#common/templates/error-page.js';

const updateRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				heading: 'Сайт обновляется',
				pageTemplate: renderErrorPage(503, 'Попробуйте обновить страницу'),
			},
		};
	},
};

export { updateRoute };
