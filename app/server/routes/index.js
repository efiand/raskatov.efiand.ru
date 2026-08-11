import { notFoundRoute } from '#server/routes/__/404.js';
import { updateRoute } from '#server/routes/__/update.js';
import { dabtRoute } from '#server/routes/dabt.js';
import { mainRoute } from '#server/routes/main.js';
import { poemRoute } from '#server/routes/poem.js';
import { privacyRoute } from '#server/routes/privacy.js';
import { sitemapXmlRoute } from '#server/routes/sitemap-xml.js';

/** @type {{ [name: string]: Route }} */
const routes = {
	'/': mainRoute,
	'/__/404': notFoundRoute,
	'/__/update': updateRoute,
	'/dabt/:id': dabtRoute,
	'/poem/:id': poemRoute,
	'/privacy': privacyRoute,
	'/sitemap.xml': sitemapXmlRoute,
};

export { routes };
