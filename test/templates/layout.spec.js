import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { renderLayout } from '#common/templates/layout.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';

const base = {
	heading: 'Heading',
	isManuscript: false,
	pageTemplate: '<p>content</p>',
	pathname: '/poem/1',
};

describe('Шаблоны/layout', () => {
	test('На общих страницах скрывает адрес автора', () => {
		const result = renderLayout({ ...base, pathname: '/privacy' });

		assert.doesNotMatch(result, /layout__author/);
	});

	test('Книга ссылается на рукопись и показывает автора', () => {
		const { author } = getSiteConfig();
		const result = renderLayout(base);

		assert.match(result, /href="\/manuscript\/poem\/1"/);
		assert.match(result, />Рукопись</);
		assert.match(result, new RegExp(`<address class="layout__author">${author}</address>`));
	});

	test('Рукопись ссылается на книгу', () => {
		const result = renderLayout({ ...base, isManuscript: true, pathname: '/poem/1' });

		assert.match(result, /href="\/poem\/1"/);
		assert.match(result, />Книга</);
		assert.match(result, new RegExp(`href="${MANUSCRIPT_PREFIX}"`));
	});

	test('Помечает логотип главной как текущую страницу', () => {
		const result = renderLayout({ ...base, pathname: '/' });

		assert.match(result, /layout__logo" href="\/" aria-label="К содержанию" aria-current="page"/);
	});
});
