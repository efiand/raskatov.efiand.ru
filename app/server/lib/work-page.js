import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { BOOKS, WORK_DATA } from '#common/constants.js';
import { renderCopyright } from '#common/templates/copyright.js';
import { getEmailLink } from '#core/common/lib/get-email-link.js';
import { resolveSourcePublishedTime } from '#core/common/lib/resolve-source-published-time.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderTimeTag } from '#core/common/templates/time.js';

/** @type {Record<string, string>} */
const cache = {};

/** @type {(options: WorkPageOptions) => Promise<LayoutData>} */
async function getWorkPage({ book, id, description, isManuscript = false }) {
	const key = `${book}/${id}`;
	const sourcePath = `${cwd()}/app/common/data/${key}.html`;

	if (!cache[key]) {
		cache[key] = await readFile(sourcePath, 'utf-8');
	}

	const { title, date } = WORK_DATA[book][id - 1];
	const [year] = date.split('-');
	const { pubDate } = getSiteConfig();
	const publishedTime = await resolveSourcePublishedTime({
		fallback: pubDate || new Date().toISOString(),
		sourcePath,
	});
	const reviewBlock = isManuscript
		? ''
		: /* html */ `
			<div class="content content--centered _separated-lg">
				<a class="text-link" href="${getEmailLink({ subject: `Отзыв на произведение «${title}»` })}">Оставить отзыв</a>
				<div class="small-text">Нажимая на кнопку, вы соглашаетесь с <a class="text-link" href="/privacy">Политикой обработки персональных данных</a>.</div>
			</div>
		`;

	return {
		articleWork: {
			bookId: book,
			bookTitle: BOOKS[book],
			copyrightYear: year,
			createdTime: date,
		},
		description: `${description} «${title}».`,
		heading: BOOKS[book],
		ogType: 'article',
		pageTemplate: /* html */ `
			<h2>${title}</h2>
			<div class="content content--${book === 'poem' ? 'poem' : 'prose'}">
				${cache[key]}
				${renderTimeTag({ className: 'time _separated', date })}
			</div>
			${reviewBlock}
			${renderCopyright({ isManuscript, pathname: `/${book}/${id}`, year })}
		`,
		publishedTime,
		title,
	};
}

export { getWorkPage };
