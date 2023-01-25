const datetimeFmt = new Intl.DateTimeFormat(
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

export interface ILog {
	message: string;
	timestamp: number;
}

export interface IChangelogProps {
	logs: ILog[];
}

export function Changelog(props: IChangelogProps) {
	return (
		<article className='border-1 border-black'>
			<h2 className='font-bold'>Changelog</h2>
			{props.logs.map((log) => (
				<section className='m-1 p-1 flex flex-row' key={log.timestamp}>
					<p className='text-left w-1/2'>
						{datetimeFmt.format(log.timestamp)}
					</p>
					<p className='text-right w-1/2'>{log.message}</p>
				</section>
			))}
		</article>
	);
}
