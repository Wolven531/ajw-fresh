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
	/**
	 * e.g. "Description", "Symbol", "Qty", "Price"
	 */
	columnTitles: string[];
	originalHTML: string;
	rows: ITransaction[];
	/**
	 * e.g. "Portfolio Summary", "Account Activity"
	 */
	title: string;
}

export interface IResponseData {
	query: string;
	results: string[];
}

export interface ITransaction {
	/**
	 * e.g. "Margin", "Sweep", ""
	 */
	accountType: string;
	/**
	 * e.g. "$4.89"
	 */
	credit: number;
	/**
	 * e.g. "12/01/2022"
	 */
	date: string;
	/**
	 * e.g. "$4.29"
	 */
	debit: number;
	/**
	 * e.g. "Baudax Bio CUSIP: 07160F404"
	 */
	description: string;
	/**
	 * e.g. "$10.47"
	 */
	price: number;
	/**
	 * e.g. 2.025, "81S"
	 */
	quantity: number;
	/**
	 * e.g. "ORC"
	 */
	symbol: string;
	/**
	 * e.g. "SPR", "Buy", "COIN", "Sell", "SLIP", "ACH", "CDIV", "STO", "OCA", "INT", "BTC", ""
	 */
	transactionType: string;
}

export interface IValidationService {
	isHTMLString: (val?: string) => boolean;
	isRobinhoodDocument: (val: string) => boolean;
}
