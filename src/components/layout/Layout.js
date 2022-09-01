import MainNavigation from './MainNavigation';
import Footer from './Footer';

export default function Layout({children}) {
	return (
		<div>
			<MainNavigation />
			<div>{children}</div>
			<Footer />
		</div>
	);
}
