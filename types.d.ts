export interface IGithubUser {
	avatar_url: string;
	login: string;
	name: string;
}

/**
 * Represents a logged change to the application
 */
export interface ILog {
	/**
	 * Message describing the change(s)
	 */
	message: string;
	/**
	 * Timestamp (UTC milliseconds) that changes happened
	 */
	timestamp: number;
}

export interface IParsedTable {
	columnTitles: string[]; // e.g. "Description", "Symbol", "Qty", "Price"
	originalHTML: string;
	rows: string[]; // HTML string data of row
	title: string; // e.g. "Portfolio Summary", "Account Activity"
}

export interface IResponseData {
	query: string;
	results: string[];
}

export interface ITransaction {
	accountType: string; // e.g. "Margin"
	credit: number; // e.g. "$4.89"
	date: string; // e.g. "12/01/2022"
	debit: number; // e.g. "$4.29"
	description: string; // e.g. "Baudax Bio CUSIP: 07160F404"
	price: number; // e.g. "$10.47"
	quantity: number; // e.g. 2.025, "81S"
	symbol: string; // e.g. "ORC"
	transactionType: string; // e.g. "SPR", "Buy", "COIN"
}

export interface IValidationService {
	isHTMLString: (val?: string) => boolean;
	isRobinhoodDocument: (val: string) => boolean;
}
