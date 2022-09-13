/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import twindPlugin from '$fresh/plugins/twind.ts';
import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import twindConfig from './twind.config.ts';

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
