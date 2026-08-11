import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { createRouteParams } from '#core/test-helpers/route-params.js';
import '#server/lib/app.js';
import { sitemapXmlRoute } from '#server/routes/sitemap-xml.js';

describe('Routes/Sitemap-xml', () => {
	test('Excludes manuscript mirror from sitemap', async () => {
		const { baseUrl } = getSiteConfig();
		const { template } = await sitemapXmlRoute.GET(createRouteParams());
		const xml = template ?? '';

		assert.doesNotMatch(xml, new RegExp(`<loc>${baseUrl}${MANUSCRIPT_PREFIX}`));
		assert.doesNotMatch(xml, new RegExp(`<loc>${baseUrl}${MANUSCRIPT_PREFIX}/`));
	});
});
