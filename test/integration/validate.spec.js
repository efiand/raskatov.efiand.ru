import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { registerMarkupValidationTests, useIntegrationFixture } from '#core/test-helpers/integration-fixture.js';
import { createApp } from '#server/lib/app.js';

const fixture = useIntegrationFixture({ createApp });

describe('Интеграция', () => {
	registerMarkupValidationTests(fixture);

	describe('Издания', () => {
		test('Рукопись подключает manuscript.css', async () => {
			const markup = await fixture.getMarkup('/manuscript/poem/1');

			assert.match(markup, /manuscript\.css/);
			assert.match(markup, /apple-mobile-web-app-title" content="Рукопись"/);
		});

		test('Главная рукописи без промо-блока', async () => {
			const markup = await fixture.getMarkup('/manuscript');

			assert.doesNotMatch(markup, /Хочу литературный сайт/);
		});

		test('Главная книги содержит промо-блок', async () => {
			const markup = (await fixture.getMarkup('/')).replaceAll('\u00AD', '');

			assert.match(markup, /Хочу литературный сайт/);
		});
	});

	describe('Страницы', () => {
		test('Неизвестный маршрут возвращает 404', async () => {
			const markup = (await fixture.getMarkup('/unknown-page')).replaceAll('\u00AD', '');

			assert.match(markup, /Ошибка 404/);
			assert.match(markup, /Страница не найдена/);
		});

		test('Страница произведения рукописи без блока отзыва', async () => {
			const markup = await fixture.getMarkup('/manuscript/poem/1');

			assert.doesNotMatch(markup, /Оставить отзыв/);
			assert.doesNotMatch(markup, /mailto:/);
		});

		test('Страница произведения содержит mailto для отзыва', async () => {
			const markup = (await fixture.getMarkup('/poem/1')).replaceAll('\u00AD', '');

			assert.match(markup, /Оставить отзыв/);
			assert.match(markup, /mailto:/);
		});
	});
});
