import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderCookieConsentSettingsControl } from '#core/common/templates/cookie-consent-settings-control.js';
import { renderTimeTag } from '#core/common/templates/time.js';

const heading = 'Политика обработки персональных данных';
let cache = '';

const privacyRoute = {
	/** @type {RouteMethod} */
	async GET({ isManuscript = false }) {
		if (!cache) {
			cache = await readFile(`${cwd()}/app/common/data/privacy.html`, 'utf-8');
		}

		const { privacyRevisionDate } = getSiteConfig();
		const settingsControl = isManuscript
			? ''
			: renderCookieConsentSettingsControl({ className: 'text-link', pathname: '/privacy' });
		const settingsTemplate = settingsControl
			? /* html */ `
					<div class="time _separated">
						${settingsControl}
					</div>
				`
			: '';

		return {
			page: {
				description: 'Страница политики конфиденциальности.',
				heading,
				pageTemplate: /* html */ `
					<div class="content content--prose">
						${cache}
						<div class="time _separated">
							<b>Дата публикации:</b>
							${renderTimeTag({ date: privacyRevisionDate })}
						</div>
						${settingsTemplate}
					</div>
				`,
			},
		};
	},
};

export { privacyRoute };
