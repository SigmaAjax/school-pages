import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Header from './Header';
import {Grid} from '@mui/material';

export default function Layout({children}) {
	return (
		<div>
			<Header />
			<MainNavigation />
			<Grid container>{children}</Grid>
			<Footer />
		</div>
	);
}
