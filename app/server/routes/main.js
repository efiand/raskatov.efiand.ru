import { BOOKS, WORK_DATA } from '#common/constants.js';
import { renderCopyright } from '#common/templates/copyright.js';
import { ORDER_TEMPLATE } from '#common/templates/order.js';
import { renderToc } from '#common/templates/toc.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';

/** @type {Book[]} */
const books = ['poem', 'dabt'];

const mainRoute = {
	/** @type {RouteMethod} */
	async GET({ isManuscript }) {
		return {
			page: {
				articleSeries: books.map((id) => ({ id, title: BOOKS[id] })),
				description: 'Премиальный сборник российского литератора эпохи нулевых.',
				heading: getSiteConfig().author,
				pageTemplate: /* html */ `
					${books.map((book) => renderBookToc(book, Boolean(isManuscript))).join('')}
					${isManuscript ? '' : ORDER_TEMPLATE}
					${renderCopyright({
						authorTemplate: /* html */ `<a class="text-link" href="https://efiand.ru/">efiand</a>, разработка сайта`,
						isManuscript,
						pathname: '/',
						year: '2025',
					})}
				`,
			},
		};
	},
};

/** @type {(book: Book, isManuscript: boolean) => string} */
function renderBookToc(book, isManuscript) {
	return /* html */ `<h2 id="${book}">${BOOKS[book]}</h2>${renderToc(WORK_DATA[book], book, isManuscript)}`;
}

export { mainRoute };
