// ~~~~~ Formatting constants

export const datetimeFmt = new Intl.DateTimeFormat(
	'en-US',
	{
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		month: '2-digit',
		year: '2-digit',
		timeZone: 'America/Los_Angeles',
	},
);

export const moneyFmt = new Intl.NumberFormat('en-US', {
	currency: 'usd',
	style: 'currency',
});

export const timeFmt = new Intl.RelativeTimeFormat('en-US');

// ~~~~~ Collection constants

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
export const JOKES = [
	'Why do Java developers often wear glasses? They can\'t C#.',
	'A SQL query walks into a bar, goes up to two tables and says “can I join you?”',
	'Wasn\'t hard to crack Forrest Gump\'s password. 1forrest1.',
	'I love pressing the F5 key. It\'s refreshing.',
	'Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”',
	'There are 10 types of people in the world. Those who understand binary and those who don\'t.',
	'Why are assembly programmers often wet? They work below C level.',
	'My favourite computer based band is the Black IPs.',
	'What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.',
	'An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.',
];

export const NAMES = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank'].sort();

// ~~~~~ String constants

export const DEFAULT_COLUMN_TITLE = '';
export const DEFAULT_TABLE_TITLE = '';
