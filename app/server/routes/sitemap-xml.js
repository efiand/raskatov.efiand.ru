import { cwd } from 'node:process';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { resolveSourcePublishedTime } from '#core/common/lib/resolve-source-published-time.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { createSitemapXmlRoute } from '#core/common/templates/sitemap-xml.js';

const sitemapXmlRoute = createSitemapXmlRoute(async () => {
	const { baseUrl, pubDate } = getSiteConfig();
	const fallback = pubDate || new Date().toISOString();
	const pages = [...getSiteConfig().publicPages].filter((page) => !page.startsWith(MANUSCRIPT_PREFIX));

	return Promise.all(
		pages.map(async (page) => {
			const sourcePath = getWorkSourcePath(page);
			const loc = `${baseUrl}${page}`;

			if (sourcePath) {
				return {
					lastmod: await resolveSourcePublishedTime({ fallback, sourcePath }),
					loc,
				};
			}

			if (page === '/privacy') {
				return { loc };
			}

			return { lastmod: fallback, loc };
		}),
	);
});

/** @type {(pathname: string) => string | undefined} */
function getWorkSourcePath(pathname) {
	const match = /^\/([^/]+)\/(\d+)$/.exec(pathname);

	if (!match) {
		return undefined;
	}

	const [, book, id] = match;

	return `${cwd()}/app/common/data/${book}/${id}.html`;
}

export { sitemapXmlRoute };
