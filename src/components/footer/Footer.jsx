import "./Footer.css";
import BlockLogo from "./BlockLogo";

const Footer = () => {
	return (
		<footer className="container-footer">
			<div className="content">
				<BlockLogo />
				<nav className="navbar-footer">
					<ul className="navbar-nav-footer">
						<li className="nav-item-footer">
							<a href="#">Square</a>
						</li>
						<li className="nav-item-footer">
							<a href="#">Cash App</a>
						</li>
						<li className="nav-item-footer">
							<a href="#">Spiral</a>
						</li>
						<li className="nav-item-footer">
							<a href="#">Tidal</a>
						</li>
						<li className="nav-item-footer">
							<a href="#">TBD</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className="footer">
				<span className="description">
					&copy; 2024 Block, Inc. BLOCK and de Block Logo are trademarks of
					Block, Inc.
				</span>
				<span className="style-legal">Legal</span>
			</div>
		</footer>
	);
};

export default Footer;
