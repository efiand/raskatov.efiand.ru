import { initSiteClient } from '#core/client/lib/init-site-client.js';
import { setSiteConfig } from '#core/common/lib/site-config.js';

setSiteConfig({
	author: 'Андрей Раскатов',
	baseHost: 'raskatov.efiand.ru',
	cookieConsent: {
		excludePathnamePrefixes: ['/manuscript'],
	},
	email: 'efiand@ya.ru',
	privacyRevisionDate: '2026-07-06',
	projectTitle: 'Премиальный сборник Андрея Раскатова',
	pubDate: new Date().toISOString(),
	version: {
		CSS: 1,
		JS: 1,
	},
	yandexMetrikaId: 103961970,
});

initSiteClient();
