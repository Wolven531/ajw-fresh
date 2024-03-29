// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from './deno.json' assert { type: 'json' };
import * as $0 from './routes/_404.tsx';
import * as $1 from './routes/_500.tsx';
import * as $2 from './routes/_app.tsx';
import * as $3 from './routes/about/index.tsx';
import * as $4 from './routes/api/joke.ts';
import * as $5 from './routes/api/rate.tsx';
import * as $6 from './routes/countdown/index.tsx';
import * as $7 from './routes/github/[username].tsx';
import * as $8 from './routes/greet/[name].tsx';
import * as $9 from './routes/index.tsx';
import * as $10 from './routes/parser/index.tsx';
import * as $11 from './routes/search.tsx';
import * as $$0 from './islands/Countdown.tsx';
import * as $$1 from './islands/Counter.tsx';
import * as $$2 from './islands/HtmlParserForm.tsx';
import * as $$3 from './islands/TableExplorer.tsx';
import * as $$4 from './islands/TitleSetter.tsx';

const manifest = {
	routes: {
		'./routes/_404.tsx': $0,
		'./routes/_500.tsx': $1,
		'./routes/_app.tsx': $2,
		'./routes/about/index.tsx': $3,
		'./routes/api/joke.ts': $4,
		'./routes/api/rate.tsx': $5,
		'./routes/countdown/index.tsx': $6,
		'./routes/github/[username].tsx': $7,
		'./routes/greet/[name].tsx': $8,
		'./routes/index.tsx': $9,
		'./routes/parser/index.tsx': $10,
		'./routes/search.tsx': $11,
	},
	islands: {
		'./islands/Countdown.tsx': $$0,
		'./islands/Counter.tsx': $$1,
		'./islands/HtmlParserForm.tsx': $$2,
		'./islands/TableExplorer.tsx': $$3,
		'./islands/TitleSetter.tsx': $$4,
	},
	baseUrl: import.meta.url,
	config,
};

export default manifest;
