import { BOOKS, WORK_DATA } from '#common/constants.js';

/** @type {(payload: { manuscriptPrefix?: string; pathname?: string; }) => string} */
function renderNavRing({ manuscriptPrefix = '', pathname = '' }) {
	const [, book, rawId] = /** @type {[void, Book, string]} */ (pathname.split('/'));
	const id = Number(rawId);
	let next = '/poem/1';
	let prev = '/dabt/3';
	let hash = '';

	if (BOOKS[book]) {
		/** @type {Book} */
		const anotherBook = book === 'poem' ? 'dabt' : 'poem';

		next = id === WORK_DATA[book].length ? `/${anotherBook}/1` : `/${book}/${id + 1}`;
		prev = id === 1 ? `/${anotherBook}/${WORK_DATA[anotherBook].length}` : `/${book}/${id - 1}`;
		hash = `#${book}`;
	}

	const mainToc = manuscriptPrefix
		? /* html */ `
				<li>
					<a class="nav-ring__link nav-ring__link--toc" rel="toc" href="/">Книга</a>
				</li>
			`
		: '';

	const tocLinkClass = manuscriptPrefix
		? 'nav-ring__link nav-ring__link--toc nav-ring__link--toc-icon'
		: 'nav-ring__link nav-ring__link--toc';
	const tocLabel = manuscriptPrefix ? /* html */ `<span class="nav-ring__toc-text">Содержание</span>` : 'Содержание';

	return /* html */ `
		<ul class="nav-ring">
			<li>
				<a class="nav-ring__link nav-ring__link--prev" rel="prev" href="${manuscriptPrefix}${prev}">
					<span class="nav-ring__text">Назад</span>
				</a>
			</li>
			${
				pathname === '/'
					? mainToc
					: /* html */ `
						<li>
							<a class="${tocLinkClass}" rel="toc" href="${manuscriptPrefix}/${hash}">${tocLabel}</a>
						</li>
					`
			}
			<li>
				<a class="nav-ring__link nav-ring__link--next" rel="next" href="${manuscriptPrefix}${next}">
					<span class="nav-ring__text">Далее</span>
				</a>
			</li>
		</ul>
	`;
}

export { renderNavRing };
