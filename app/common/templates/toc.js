import { MANUSCRIPT_PREFIX } from '#common/constants.js';

function renderItem(title = '', url = '') {
	return /* html */ `
		<li class="toc__item">
			<a class="toc__link" href="${url}">
				<span class="toc__content">${title}</span>
			</a>
		</li>
	`;
}

/** @type {(items: DataItem[], book: Book, isManuscript?: boolean) => string} */
function renderToc(items, book, isManuscript = false) {
	const template = items
		.map(({ title }, index) => renderItem(title, `${isManuscript ? MANUSCRIPT_PREFIX : ''}/${book}/${index + 1}`))
		.join('');

	return /* html */ `<ol class="toc">${template}</ol>`;
}

export { renderToc };
