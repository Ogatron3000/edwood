import './Navbar.css';
import Search from "./Search";
import Drawer from "./Drawer";
import {useState} from "react";
import Logo from "./Logo";
import {Link} from "react-router-dom";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState({
        display: false,
        onscreen: false,
    });

    function toggleDrawer() {
        if (drawerOpen.display) {
            setDrawerOpen({display: true, onscreen: false});
            setTimeout(() => setDrawerOpen({display: false, onscreen: true}), 500)
        } else {
            setDrawerOpen({display: true, onscreen: false});
            setTimeout(() => setDrawerOpen({display: true, onscreen: true}), 1)
        }
    }

    return (
        <header>
            <div className="container grid">
                <nav className="nav">
                    <Logo/>
                    <Search/>
                    <button onClick={toggleDrawer} className="nav__burger" aria-label="Open Navigation Drawer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    <ul className="nav__links">
                        <li><Link to="/" onClick={(e) => e.target.blur()}>Films</Link></li>
                        <li><Link to="/sign-in" onClick={(e) => e.target.blur()}>Sign In</Link></li>
                    </ul>
                </nav>

                {drawerOpen.display &&
                    <Drawer handleClick={toggleDrawer} drawerVisible={drawerOpen.onscreen} />}
            </div>
        </header>
    )
}
