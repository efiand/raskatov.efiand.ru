declare global {
	type Book = 'dabt' | 'poem';

	type DataItem = {
		date?: string;
		title: string;
	};

	interface LayoutData {
		isManuscript?: boolean;
	}

	interface RouteParams {
		isManuscript?: boolean;
	}

	type WorkPageOptions = {
		book: Book;
		description: string;
		id: number;
		isManuscript?: boolean;
	};
}

export {};
