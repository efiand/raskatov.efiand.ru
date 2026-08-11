import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { renderNavRing } from '#common/templates/nav-ring.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';

/** @type {(pathname: string) => boolean} */
function isCommonPage(pathname) {
	return pathname === '/' || pathname === '/privacy' || pathname.startsWith('/__/');
}

/** @type {(data: LayoutData) => string} */
function renderLayout({ heading, isManuscript, pageTemplate, pathname = '' }) {
	const { author } = getSiteConfig();
	const editionHref = isManuscript
		? isCommonPage(pathname)
			? '/'
			: pathname
		: `${MANUSCRIPT_PREFIX}${isCommonPage(pathname) ? '' : pathname}`;
	const editionLabel = isManuscript ? 'Книга' : 'Рукопись';
	const logoAriaCurrent = pathname === '/' ? /* html */ ' aria-current="page"' : '';
	const logoHref = isManuscript ? MANUSCRIPT_PREFIX : '/';

	return /* html */ `
		<div class="layout">
			<header class="layout__header">
				<a class="layout__logo" href="${logoHref}" aria-label="К содержанию"${logoAriaCurrent}></a>
				<a class="layout__edition-link" href="${editionHref}">${editionLabel}</a>
			</header>

			<main class="layout__main">
				<section class="layout__content">
					<h1>${heading}</h1>
					${isCommonPage(pathname) && !isManuscript ? '' : /* html */ `<address class="layout__author">${author}</address>`}

					${pageTemplate}
				</section>
			</main>

			<footer class="layout__footer">
				<nav>${renderNavRing({ manuscriptPrefix: isManuscript ? MANUSCRIPT_PREFIX : '', pathname })}</nav>
			</footer>
		</div>
	`;
}

export { renderLayout };
