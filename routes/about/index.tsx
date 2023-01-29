import { Head } from '$fresh/runtime.ts';
import { Navigation } from '../../components/Navigation.tsx';

export const AboutPage = () => {
	return (
		<>
			<Head>
				<title>About</title>
			</Head>
			<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
				<Navigation />
				<h1 className='font-bold'>About</h1>
				<p>This is the about page</p>
			</main>
		</>
	);
};

export default AboutPage;
