import '#common/configure-site.js';
import { MANUSCRIPT_PREFIX, WORK_PAGES } from '#common/constants.js';
import { renderErrorPage } from '#common/templates/error-page.js';
import { setSiteConfig } from '#core/common/lib/site-config.js';
import { createHttpServer } from '#core/server/lib/http-server.js';
import { createStandardRouteDispatcher, resolvePathnamePrefix } from '#core/server/lib/route-dispatcher.js';
import { renderPage } from '#server/lib/page.js';
import { routes } from '#server/routes/index.js';

const publicPages = [...WORK_PAGES, MANUSCRIPT_PREFIX, ...WORK_PAGES.map((page) => `${MANUSCRIPT_PREFIX}${page}`)];

setSiteConfig({ publicPages, routes });

/** @type {(options?: CreateAppOptions) => import('node:http').Server} */
function createApp({ isQuiet = false, middleware, port } = {}) {
	return createHttpServer({
		dispatch: createStandardRouteDispatcher({
			isQuiet,
			renderErrorPage,
			renderPage,
			resolveRequest: resolveManuscriptRequest,
		}),
		isQuiet,
		middleware,
		port,
		renderErrorPage,
		renderPage,
	});
}

/** @type {ResolveRequest} */
function resolveManuscriptRequest(url) {
	const { isPrefixed, pathname } = resolvePathnamePrefix(MANUSCRIPT_PREFIX, url.pathname);

	return { context: { isManuscript: isPrefixed }, pathname };
}

export { createApp, renderPage };
