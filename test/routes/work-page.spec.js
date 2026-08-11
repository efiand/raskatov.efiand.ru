import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { BOOKS, WORK_DATA } from '#common/constants.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { createRouteParams } from '#core/test-helpers/route-params.js';
import { getWorkPage } from '#server/lib/work-page.js';
import { dabtRoute } from '#server/routes/dabt.js';
import { poemRoute } from '#server/routes/poem.js';

describe('Routes/Work-page', () => {
	test('Dabt work page includes prose layout', async () => {
		const { page } = await dabtRoute.GET(createRouteParams({ id: 1 }));

		assert.match(page?.pageTemplate ?? '', /content--prose/);
		assert.match(page?.description ?? '', /Современная бытовая сказка/);
	});

	test('GetWorkPage caches html content between calls', async () => {
		const first = await getWorkPage({ book: 'poem', description: 'Стихотворение', id: 2 });
		const second = await getWorkPage({ book: 'poem', description: 'Стихотворение', id: 2 });

		assert.strictEqual(first.pageTemplate, second.pageTemplate);
		assert.match(first.pageTemplate ?? '', /Светлое Христово Воскресение/);
	});

	test('GetWorkPage передаёт createdTime и publishedTime', async () => {
		const page = await getWorkPage({ book: 'poem', description: 'Стихотворение', id: 1 });

		assert.strictEqual(page.articleWork?.createdTime, WORK_DATA.poem[0].date);
		assert.match(page.publishedTime ?? '', /^\d{4}-\d{2}-\d{2}T/);
		assert.notEqual(page.publishedTime, WORK_DATA.poem[0].date);
	});

	test('Poem work page includes poem layout and review link', async () => {
		const { email } = getSiteConfig();
		const { page } = await poemRoute.GET(createRouteParams({ id: 1 }));

		assert.strictEqual(page?.title, WORK_DATA.poem[0].title);
		assert.strictEqual(page?.heading, BOOKS.poem);
		assert.match(page?.pageTemplate ?? '', /content--poem/);
		assert.match(page?.pageTemplate ?? '', /Оставить отзыв/);
		assert.match(page?.pageTemplate ?? '', new RegExp(`mailto:${email}\\?subject=`));
		assert.match(page?.pageTemplate ?? '', /Политикой обработки персональных данных/);
		assert.match(page?.pageTemplate ?? '', /class="small-text"/);
		assert.match(page?.pageTemplate ?? '', /class="text-link" href="\/privacy"/);
		assert.match(page?.pageTemplate ?? '', /Прекрасная пора/);
	});
});
