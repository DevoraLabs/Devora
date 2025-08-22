import Navbar from '../Navbar/Navbar';
import './Header.css';
import LeftNavbar from '../LeftNavbar/LeftNavbar';
import HeaderStartups from '../HeaderStartups/HeaderStartups';

function Header() {
	return (
		<div className="header">
			<Navbar />
			<LeftNavbar />
			<div className="header-top-divider"></div>
			<div className="header-left-divider"></div>

			<h1 className="main-section">Про стартап</h1>

			<HeaderStartups />
		</div>
	);
}

export default Header;
