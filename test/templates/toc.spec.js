import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { MANUSCRIPT_PREFIX, WORK_DATA } from '#common/constants.js';
import { renderToc } from '#common/templates/toc.js';

describe('Templates/Toc', () => {
	test('Adds manuscript prefix when requested', () => {
		const result = renderToc(WORK_DATA.dabt.slice(0, 1), 'dabt', true);

		assert.match(result, new RegExp(`href="${MANUSCRIPT_PREFIX}/dabt/1"`));
	});

	test('Renders ordered list with book links', () => {
		const result = renderToc(WORK_DATA.poem.slice(0, 2), 'poem');

		assert.match(result, /^<ol class="toc">/);
		assert.match(result, /href="\/poem\/1"/);
		assert.match(result, /href="\/poem\/2"/);
		assert.match(result, /Прекрасная пора/);
	});
});
