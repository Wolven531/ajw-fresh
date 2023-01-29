export interface INavLinkProps {
	content: string;
	href: string;
}

export function NavLink({ content, href }: INavLinkProps) {
	return (
		<a href={href} className='p-1 hover:bg-green-500 hover:text-white'>
			{content}
		</a>
	);
}

export function Navigation() {
	return (
		<nav className='border-1 border-green-500 flex flex-row content-center justify-between p-1'>
			<NavLink href='/' content='Home' />
			<NavLink href='/parser' content='Parser' />
			<NavLink href='/countdown' content='Countdown' />
			<NavLink href='/about' content='About' />
		</nav>
	);
}
