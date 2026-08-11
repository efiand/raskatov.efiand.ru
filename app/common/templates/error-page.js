import { ORDER_TEMPLATE } from '#common/templates/order.js';
import { getEmailLink } from '#core/common/lib/get-email-link.js';

const PRIVACY_MAILTO_CONSENT = /* html */ `
	<div class="small-text">
		Отправляя письмо, вы соглашаетесь с <a class="text-link" href="/privacy">Политикой обработки персональных данных</a>.
	</div>
`;

/** @type {(statusCode: number, message?: string) => string} */
function renderErrorPage(statusCode, message = '') {
	const emailLink = getEmailLink({ subject: 'Ошибка на сайте' });
	const messageBlock = message ? /* html */ `<p class="_separated-lg">${message}</p>` : '';

	return /* html */ `
		<section class="content content--centered">
			<h2 class="_visually-hidden">Ошибка ${statusCode}</h2>
			${messageBlock}
			<p class="_separated">Свяжитесь с <a class="text-link" href="${emailLink}">разработчиком</a>.</p>
			${PRIVACY_MAILTO_CONSENT}
		</section>
		${ORDER_TEMPLATE}
	`;
}

export { renderErrorPage };
