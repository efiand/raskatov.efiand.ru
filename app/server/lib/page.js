import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { renderLayout } from '#common/templates/layout.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { createRenderPage } from '#core/common/templates/page.js';
import { hyphenateRu } from '#core/server/lib/hyphenate.js';

const MANUSCRIPT_IMAGE_PRELOAD_TEMPLATE = /* html */ `
	<link rel="preload" href="/images/back.webp" as="image" type="image/webp" media="(min-width: 928px)">
`;

/** @type {(data: LayoutData) => PageAssetsOptions} */
function getPageAssetsOptions({ isManuscript = false }) {
	return {
		cssEntry: isManuscript ? 'manuscript' : 'main',
		devCssPath: isManuscript ? '/client/css/manuscript.css' : '/client/css/main.css',
	};
}

const renderPageCore = createRenderPage({
	getPageAssetsOptions,
	renderLayout,
});

/** @type {(data: LayoutData) => Promise<string>} */
async function renderPage({ headTemplate = '', isManuscript = false, pageTemplate = '', pathname = '', ...rest }) {
	const hyphenatedPageTemplate = await hyphenateRu(pageTemplate);
	const manuscriptUrl = pathname === '/' ? MANUSCRIPT_PREFIX : `${MANUSCRIPT_PREFIX}${pathname}`;
	const manuscriptHeadTemplate = isManuscript ? MANUSCRIPT_IMAGE_PRELOAD_TEMPLATE : '';

	return renderPageCore({
		...rest,
		faviconPrefix: isManuscript ? MANUSCRIPT_PREFIX : '',
		headTemplate: `${manuscriptHeadTemplate}${headTemplate}`,
		isManuscript,
		ogPathname: isManuscript ? manuscriptUrl : undefined,
		pageTemplate: hyphenatedPageTemplate,
		pathname,
		webAppTitle: isManuscript ? 'Рукопись' : getSiteConfig().author,
	});
}

export { renderPage };
