import { Navigation } from '../components/Navigation.tsx';
import TitleSetter from '../islands/TitleSetter.tsx';

export const AboutPage = () => {
	return (
		<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
			<h1 className='font-bold'>About</h1>
			<p>This is the about page</p>
			<TitleSetter windowTitle='About' />
			<Navigation />
		</main>
	);
};

export default AboutPage;
