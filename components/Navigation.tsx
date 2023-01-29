/**
 * Properties to pass to NavLink component
 */
export interface INavLinkProps {
	content: string;
	href: string;
}

/**
 * This component renders a simple navigation link using an HTML anchor tag
 */
export const NavLink = ({ content, href }: INavLinkProps) => {
	return (
		<a href={href} className='p-1 hover:bg-green-500 hover:text-white'>
			{content}
		</a>
	);
};

/**
 * This component renders navigation for the application
 */
export const Navigation = () => {
	return (
		<nav className='border-1 border-green-500 flex flex-row content-center justify-between m-1 p-1'>
			<NavLink href='/' content='Home' />
			<NavLink href='/parser' content='Parser' />
			<NavLink href='/countdown' content='Countdown' />
			<NavLink href='/about' content='About' />
		</nav>
	);
};

export default Navigation;
