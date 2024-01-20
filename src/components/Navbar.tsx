import { Link, useLocation } from 'react-router-dom';
import './navbar.css'
import { MouseEventHandler, useEffect, useState } from 'react';
function Navbar() {
    const location = useLocation();
    const [navbarStyle, setNavbarStyle] = useState({});
    const [isOpen, setIsOpen] = useState(true);

    useEffect(()=> {
        if(location.pathname === '/' || location.pathname === '/contact') {
            setNavbarStyle({backgroundColor: 'transparent'});
        } else {
            setNavbarStyle({backgroundColor: '#688e49'});
        }
    }, [location]);

    const handleMenuIcon: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen(!isOpen)
    };

    const handleCloseMenu = () => {
        setIsOpen(false)
    }

    return (
    <nav style={navbarStyle}>
        <ul className={isOpen ? 'nav-list open' : 'nav-list'}>
            <li><Link to={'/'} onClick={handleCloseMenu}>Home</Link></li>
            <li><Link to={'/films'} onClick={handleCloseMenu}>Films</Link></li>
            <li><Link to={'/contact'} onClick={handleCloseMenu}>Contact</Link></li>
        </ul>
        <div className='menuIcon' onClick={handleMenuIcon}>&#9776;</div>
    </nav>
  )
}

export default Navbar;