import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { createRouteParams } from '#core/test-helpers/route-params.js';
import { mainRoute } from '#server/routes/main.js';

describe('Routes/Main', () => {
	test('Main edition includes promo block and plain toc links', async () => {
		const { page } = await mainRoute.GET(createRouteParams());

		assert.strictEqual(page?.heading, getSiteConfig().author);
		assert.match(page?.pageTemplate ?? '', /Хочу литературный сайт/);
		assert.match(page?.pageTemplate ?? '', /href="\/poem\/1"/);
		assert.doesNotMatch(page?.pageTemplate ?? '', new RegExp(`href="${MANUSCRIPT_PREFIX}/poem/1"`));
		assert.ok(page?.articleSeries?.length);
		assert.strictEqual(page?.articleSeries?.[0]?.id, 'poem');
	});

	test('Manuscript edition hides promo block and prefixes toc links', async () => {
		const { page } = await mainRoute.GET(createRouteParams({ isManuscript: true }));

		assert.doesNotMatch(page?.pageTemplate ?? '', /Хочу литературный сайт/);
		assert.match(page?.pageTemplate ?? '', new RegExp(`href="${MANUSCRIPT_PREFIX}/poem/1"`));
		assert.match(page?.pageTemplate ?? '', /id="poem"/);
	});
});
