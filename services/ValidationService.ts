export interface IValidationService {
	isHTMLString: (val?: string) => boolean;
	isRobinhoodDocument: (val: string) => boolean;
}

export const ValidationService: IValidationService = {
	isHTMLString: (val?: string) => {
		if (!val) {
			return false;
		}
		if (val.length < 1) {
			return false;
		}

		const trimmed = val.trim();

		const hasDocType = trimmed.startsWith('<!DOCTYPE html>');

		return hasDocType;
	},
	isRobinhoodDocument: function (val?: string): boolean {
		if (!val || !this.isHTMLString(val)) {
			return false;
		}

		const parser = new DOMParser();

		const doc = parser.parseFromString(val, 'text/html');

		const title = doc.querySelector('title');

		if (!title) {
			return false;
		}

		if (title.textContent !== 'Robinhood') {
			return false;
		}

		return true;
	},
};

export default ValidationService;
