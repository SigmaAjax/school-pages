import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Header from './Header';

export default function Layout({children}) {
	return (
		<div>
			<Header />
			<MainNavigation />
			<div>{children}</div>
			<Footer />
		</div>
	);
}
