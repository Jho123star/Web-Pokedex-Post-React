import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
    const searchButton = () => {
        let input = document.getElementById("search-input").value;
        window.location.href = `/search/${input}`;
    }

    return (
        <nav className="navbar navbar-expand-lg poke-nav">
            <Link className="navbar-brand poke-link" to={`/`}>Web-Pokedex</Link>
            <button className="navbar-toggler poke-toggle" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                ≡
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link poke-link" to={`/`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link poke-link" to={`/favorites`}>Favourites</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input id="search-input" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <span className="btn btn-outline-light my-2 my-sm-0" onClick={searchButton} typeof="submit">Search</span>
                </form>
            </div>
        </nav>
    );
}

export default NavBar;