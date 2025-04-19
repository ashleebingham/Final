import { Link } from 'react-router-dom';

/**
 * Navbar component providing top-level navigation for the app.
 * Includes links to the Home page and the Entertainers list.
 */
const Navbar = () => {
  return (
    <header>
      <div className="header-inner">
        {/* Logo / brand name linking to home */}
        <Link to="/" className="header-logo branding">
          Entertainment Agency
        </Link>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/entertainers" className="nav-btn">
            Entertainers
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
