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

/**
 * Properties to pass to Changelog component
 */
export interface IChangelogProps {
	/**
	 * Collection of logs to render
	 */
	logs: ILog[];
}

/**
 * This component renders a list of logs describing changes to the application
 */
export const Changelog = (props: IChangelogProps) => {
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
};

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

export default Changelog;
