import '#common/configure-site.js';
import { registerPrivacyRouteTests } from '#core/test-helpers/privacy-route-tests.js';
import { privacyRoute } from '#server/routes/privacy.js';

registerPrivacyRouteTests(privacyRoute, {
	email: 'efiand@ya.ru',
	hasCookieConsent: true,
	patterns: [/отзыв/, /Рукопись/, /не\s+содержит форм/, /электронной почте/],
});
