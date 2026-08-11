import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { MANUSCRIPT_PREFIX } from '#common/constants.js';
import { renderNavRing } from '#common/templates/nav-ring.js';

describe('Templates/Nav-ring', () => {
	test('Links first poem to previous dabt work', () => {
		const result = renderNavRing({ pathname: '/poem/1' });

		assert.match(result, /href="\/dabt\/3"/);
		assert.match(result, /href="\/poem\/2"/);
		assert.match(result, /href="\/#poem"/);
	});

	test('Links last poem to first dabt work', () => {
		const result = renderNavRing({ pathname: '/poem/14' });

		assert.match(result, /href="\/poem\/13"/);
		assert.match(result, /href="\/dabt\/1"/);
	});

	test('Prefixes prev and next links in manuscript edition', () => {
		const result = renderNavRing({ manuscriptPrefix: MANUSCRIPT_PREFIX, pathname: '/poem/3' });

		assert.match(result, new RegExp(`href="${MANUSCRIPT_PREFIX}/poem/2"`));
		assert.match(result, new RegExp(`href="${MANUSCRIPT_PREFIX}/poem/4"`));
	});

	test('Shows book link instead of contents on manuscript home', () => {
		const result = renderNavRing({ manuscriptPrefix: MANUSCRIPT_PREFIX, pathname: '/' });

		assert.match(result, /href="\/"/);
		assert.match(result, /Книга/);
		assert.doesNotMatch(result, /Содержание/);
	});

	test('Shows contents link with book hash on work pages', () => {
		const result = renderNavRing({ pathname: '/dabt/2' });

		assert.match(result, /href="\/#dabt"/);
		assert.match(result, /Содержание/);
	});
});
