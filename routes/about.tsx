import TitleSetter from '../islands/TitleSetter.tsx';

export const AboutPage = () => {
	return (
		<main>
			<h1>About</h1>
			<p>This is the about page</p>
			<TitleSetter windowTitle='About' />
		</main>
	);
};

export default AboutPage;
