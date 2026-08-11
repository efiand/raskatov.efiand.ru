import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderCookieConsentSettingsControl } from '#core/common/templates/cookie-consent-settings-control.js';

/** @typedef {{ year?: string; authorTemplate?: string; isManuscript?: boolean; pathname?: string }} CopyrightOptions */

/** @type {(options?: CopyrightOptions) => string} */
function renderCopyright({
	authorTemplate,
	isManuscript = false,
	pathname = '/',
	year = `${new Date().getFullYear()}`,
} = {}) {
	const authorName = authorTemplate ?? getSiteConfig().author;
	const settingsControl = isManuscript ? '' : renderCookieConsentSettingsControl({ className: 'text-link', pathname });
	const settingsMarkup = settingsControl ? `<br>${settingsControl}` : '';

	return /* html */ `
		<p class="layout__copyright small-text">
			© ${authorName}, ${year}<br>
			<a class="text-link" href="/privacy">Политика конфиденциальности</a>${settingsMarkup}
		</p>
	`;
}

export { renderCopyright };
