import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { renderCopyright } from '#common/templates/copyright.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';

describe('Templates/Copyright', () => {
	test('Renders author, year and privacy link by default', () => {
		const { author } = getSiteConfig();
		const result = renderCopyright({ year: '2025' });

		assert.match(result, /layout__copyright/);
		assert.match(result, /small-text/);
		assert.match(result, new RegExp(`© ${author}, 2025`));
		assert.match(result, /href="\/privacy"/);
		assert.match(result, /class="text-link"/);
		assert.match(result, /Политика конфиденциальности/);
		assert.match(result, /data-cookie-consent-settings/);
		assert.match(result, /Настройки cookie/);
	});

	test('Supports custom author template', () => {
		const { author } = getSiteConfig();
		const result = renderCopyright({ authorTemplate: '<a href="https://efiand.ru/">efiand</a>', year: '2025' });

		assert.match(result, /efiand/);
		assert.doesNotMatch(result, new RegExp(`© ${author},`));
	});

	test('Omits settings control on manuscript edition', () => {
		const result = renderCopyright({ isManuscript: true, pathname: '/', year: '2025' });

		assert.match(result, /href="\/privacy"/);
		assert.doesNotMatch(result, /data-cookie-consent-settings/);
	});
});
