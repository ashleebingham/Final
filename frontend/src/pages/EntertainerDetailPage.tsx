import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Entertainer } from '../types/Entertainer';
import { API_URL } from '../api/api';
import { fieldLabels } from '../types/Labels';

/**
 * Page that displays all the details of a single entertainer.
 * Allows users to view, edit, or delete the entertainer.
 */
const EntertainerDetailPage = () => {
  const { id } = useParams(); // Get the entertainer ID from the route
  const navigate = useNavigate();

  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);

  // Fetch the entertainer details when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/entertainment/${id}`);
        if (!res.ok) throw new Error('Failed to fetch entertainer');

        const data = await res.json();
        setEntertainer(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // Handle deletion of an entertainer
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this entertainer?')) return;

    try {
      const res = await fetch(`${API_URL}/entertainment/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      // After deletion, return to the list page
      navigate('/entertainers');
    } catch (err) {
      console.error(err);
    }
  };

  // Show loading indicator while fetching
  if (!entertainer)
    return (
      <PageWrapper>
        <p className="text-center">Loading...</p>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <main className="main-container">
        <h2 className="text-center">{entertainer.entStageName} Details</h2>

        {/* Display each field with a readable label */}
        <div className="card">
          <ul>
            {Object.entries(entertainer).map(([key, value]) => (
              <li key={key}>
                <strong>{fieldLabels[key] || key}</strong>: {value || '—'}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons to edit or delete the entertainer */}
        <div
          className="text-center mt-4 flex justify-center"
          style={{ gap: '1rem' }}
        >
          <Link
            to={`/entertainers/edit/${entertainer.entertainerId}`}
            state={{
              redirectBackTo: `/entertainers/${entertainer.entertainerId}`, // Go back here after saving
            }}
            className="nav-btn"
          >
            Edit
          </Link>

          <button onClick={handleDelete} className="nav-btn">
            Delete
          </button>
        </div>
      </main>
    </PageWrapper>
  );
};

export default EntertainerDetailPage;
