import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import '#common/configure-site.js';
import { renderErrorPage } from '#common/templates/error-page.js';
import { getSiteConfig } from '#core/common/lib/site-config.js';

describe('Шаблоны/error-page', () => {
	test('Рендерит заголовок, mailto автора, согласие и промо', () => {
		const { email } = getSiteConfig();
		const result = renderErrorPage(404);

		assert.match(result, /<h2 class="_visually-hidden">Ошибка 404<\/h2>/);
		assert.match(result, /<p class="_separated">Свяжитесь с/);
		assert.match(result, new RegExp(`mailto:${email}\\?subject=`));
		assert.match(result, />разработчиком</);
		assert.match(result, /class="small-text"/);
		assert.match(result, /class="text-link" href="\/privacy"/);
		assert.match(result, /Политикой обработки персональных данных/);
		assert.match(result, /Хочу литературный сайт/);
	});

	test('Рендерит опциональный абзац сообщения', () => {
		const result = renderErrorPage(404, 'Страница не найдена');

		assert.match(result, /<p class="_separated-lg">Страница не найдена<\/p>/);
		assert.match(result, /class="text-link" href="\/privacy"/);
	});
});
