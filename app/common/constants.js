/** @type {Record<Book, string>} */
const BOOKS = {
	dabt: 'Сказки о деде Андрее и бабке Тане',
	poem: 'Стихотворения',
};

const MANUSCRIPT_PREFIX = '/manuscript';

const WORK_DATA = {
	dabt: [
		{ date: '1997-03-10', title: 'Несостоявшаяся свадьба' },
		{ date: '1997-03-16', title: 'Водка и её последствия' },
		{ date: '1997-03-10', title: 'Сказка о поросёнке' },
	],
	poem: [
		{ date: '2003-04-19', title: 'Прекрасная пора' },
		{ date: '2003-04-26', title: 'Светлое Христово Воскресение' },
		{ date: '2003-04-29', title: 'Лицо Ирака' },
		{ date: '2005-10-14', title: 'Осенние потери' },
		{ date: '2005-11-02', title: 'Михаилу Лермонтову' },
		{ date: '2005-12-25', title: 'Свет творчества' },
		{ date: '2006-01-26', title: 'Поэтическое предостережение' },
		{ date: '2006-01-26', title: 'Вокруг Парнаса' },
		{ date: '2007-06-02', title: 'Урожайный мотив' },
		{ date: '2007-10-02', title: 'Безнадёга' },
		{ date: '2007-10-02', title: 'Осенний пессимизм' },
		{ date: '2008-01-02', title: 'Лжекорифеям' },
		{ date: '2011-05-07', title: 'После грозы' },
		{ date: '2011-05-07', title: 'Прощание с летом' },
	],
};

const WORK_PAGES = Object.entries(WORK_DATA).flatMap(([book, works]) =>
	works.map((_work, index) => `/${book}/${index + 1}`),
);

export { BOOKS, MANUSCRIPT_PREFIX, WORK_DATA, WORK_PAGES };
