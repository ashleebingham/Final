import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/api';

/**
 * Page that displays a list of all entertainers in a table.
 * Includes a link to add a new entertainer and links to view details.
 */
const EntertainersPage = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  // Fetch entertainers from the backend when the component mounts
  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        const data = await fetchEntertainers();
        setEntertainers(data);
      } catch (error) {
        console.error('Error loading entertainers:', error);
      }
    };

    loadEntertainers();
  }, []);

  // Handle deletion of an entertainer and update the UI without a full reload

  return (
    <PageWrapper>
      <main className="main-container">
        <h2 className="text-center">Entertainers</h2>

        {/* Table showing basic entertainer info */}
        <div className="card">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stage Name</th>
                <th>City</th>
                <th>Email</th>
                <th>Date Entered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entertainers.map((e) => (
                <tr key={e.entertainerId}>
                  <td>{e.entStageName}</td>
                  <td>{e.entCity}</td>
                  <td>{e.entEmailAddress || '—'}</td>
                  {/* Slice to remove time and prevent timezone shift */}
                  <td>{e.dateEntered.slice(0, 10)}</td>
                  <td>
                    {/* Link to detailed view */}
                    <Link
                      to={`/entertainers/${e.entertainerId}`}
                      className="nav-btn"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button to add a new entertainer */}
        <div className="text-center mt-4">
          <Link to="/entertainers/add" className="nav-btn">
            Add Entertainer
          </Link>
        </div>
      </main>
    </PageWrapper>
  );
};

export default EntertainersPage;
