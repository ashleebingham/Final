import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

/**
 * LandingPage component.
 * Serves as the homepage of the application, welcoming users and guiding them to view entertainers.
 */
const LandingPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="home">
          {/* Main welcome message */}
          <h1 className="home-title">Welcome to the Entertainment Agency</h1>

          {/* Brief description of the site's purpose */}
          <p className="home-description">
            Discover and book top entertainers for your next event with ease.
          </p>

          {/* Primary call-to-action button */}
          <div className="home-actions">
            <Link to="/entertainers" className="nav-btn">
              View Entertainers
            </Link>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default LandingPage;
