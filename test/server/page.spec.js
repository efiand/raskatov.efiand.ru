import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderPage } from '#server/lib/page.js';
import { getWorkPage } from '#server/lib/work-page.js';

describe('Server/Page', () => {
	test('Manuscript edition uses manuscript assets and og:url', async () => {
		const { author, baseUrl } = getSiteConfig();
		const html = await renderPage({
			heading: author,
			isManuscript: true,
			pathname: '/poem/1',
		});

		assert.match(html, /manuscript\.css/);
		assert.match(html, new RegExp(`property="og:url" content="${baseUrl}${MANUSCRIPT_PREFIX}/poem/1"`));
		assert.match(html, new RegExp(`href="${MANUSCRIPT_PREFIX}/favicon.svg"`));
		assert.match(html, /apple-mobile-web-app-title" content="Рукопись"/);
	});

	test('Главная рендерит name="author" из конфига', async () => {
		const { author } = getSiteConfig();
		const html = await renderPage({
			heading: author,
			pathname: '/',
		});

		assert.match(html, new RegExp(`<meta name="author" content="${author}">`));
		assert.match(html, /hasSiteCoreConsentCookie/);

		const bannerIndex = html.indexOf('<div class="cookie-consent"');
		const scriptIndex = html.indexOf('<script>', bannerIndex);
		assert.ok(bannerIndex > -1 && scriptIndex > bannerIndex, 'banner идёт перед reveal-скриптом');
	});

	test('Страница произведения рендерит article:* из core', async () => {
		const { author, baseUrl } = getSiteConfig();
		const workPage = await getWorkPage({ book: 'poem', description: 'Стихотворение', id: 1 });
		const html = await renderPage({
			...workPage,
			pathname: '/poem/1',
		});

		assert.match(html, new RegExp(`<meta name="author" content="${author}">`));
		assert.match(html, new RegExp(`property="article:author" content="${baseUrl}/#author"`));
		assert.match(html, new RegExp(`property="article:published_time" content="${workPage.publishedTime}"`));
		assert.match(html, /"dateCreated":"2003-04-19"/);
		assert.match(html, /article: http:\/\/ogp\.me\/ns\/article#/);
	});
});
