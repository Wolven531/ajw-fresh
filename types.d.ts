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

export interface IValidationService {
	isHTMLString: (val?: string) => boolean;
	isRobinhoodDocument: (val: string) => boolean;
}
