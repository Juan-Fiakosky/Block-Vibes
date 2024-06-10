import iconTidal from "./icon-tidal.png";
import iconPlay from "./play.png";
import "./Header.css";

const Header = () => {
	return (
		<header className="header-container">
			<button className="container-one">
				<img className="icon-play" src={iconPlay} alt="Play Icon"></img>
				<div className="container-play">
					<h3>Block Vibes</h3>
					<p>Curated by JAY-Z</p>
				</div>
			</button>
			<button className="container-two">
				<img className="logo-vibes" src={iconTidal} alt="Tidal Icon"></img>
			</button>
		</header>
	);
};

export default Header;
