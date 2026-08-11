import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { createRouteParams } from '#core/test-helpers/route-params.js';
import { notFoundRoute } from '#server/routes/__/404.js';
import { updateRoute } from '#server/routes/__/update.js';

describe('Routes/Error-pages', () => {
	test('404 route renders not found message', async () => {
		const { page } = await notFoundRoute.GET(createRouteParams());

		assert.strictEqual(page?.heading, 'Ошибка 404');
		assert.match(page?.pageTemplate ?? '', /Страница не/);
	});

	test('Update route renders refresh message', async () => {
		const { page } = await updateRoute.GET(createRouteParams());

		assert.strictEqual(page?.heading, 'Сайт обновляется');
		assert.match(page?.pageTemplate ?? '', /Попробуйте обновить страницу/);
	});
});
