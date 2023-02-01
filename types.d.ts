export interface IValidationService {
	isHTMLString: (val?: string) => boolean;
	isRobinhoodDocument: (val: string) => boolean;
}

export interface IGithubUser {
	avatar_url: string;
	login: string;
	name: string;
}

export interface IResponseData {
	query: string;
	results: string[];
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
