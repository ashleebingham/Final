import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import EntertainerForm from '../components/EntertainerForm';
import { API_URL, fetchEntertainerById } from '../api/api';

// Default empty form values for adding a new entertainer
const emptyForm: Omit<Entertainer, 'entertainerId'> = {
  entStageName: '',
  entSsn: '',
  entStreetAddress: '',
  entCity: '',
  entState: '',
  entZipCode: '',
  entPhoneNumber: '',
  entWebPage: '',
  entEmailAddress: '',
  dateEntered: '',
};

/**
 * Page for adding or editing an entertainer.
 * If an `id` is present in the route, the page loads the entertainer and switches to edit mode.
 */
const AddEntertainerPage = () => {
  const { id } = useParams(); // Get entertainer ID from the URL (if editing)
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after saving — comes from state or defaults to the list page
  const redirectBackTo = location.state?.redirectBackTo || '/entertainers';

  const [formData, setFormData] = useState(emptyForm);
  const isEditMode = Boolean(id); // Whether we're editing or adding

  // Load entertainer data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadEntertainer = async () => {
        try {
          const data = await fetchEntertainerById(id!);
          const { entertainerId, ...rest } = data;

          // Format the date string to match the date input format (YYYY-MM-DD)
          setFormData({
            ...rest,
            dateEntered: rest.dateEntered?.slice(0, 10) || '',
          });
        } catch (err) {
          console.error('Failed to fetch entertainer data:', err);
        }
      };

      loadEntertainer();
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Include entertainerId in the payload when editing
      const payload = isEditMode
        ? { entertainerId: Number(id), ...formData }
        : formData;

      console.log('Submitting payload:', payload);

      // Send either a PUT (edit) or POST (create) request
      const res = await fetch(
        isEditMode
          ? `${API_URL}/entertainment/${id}`
          : `${API_URL}/entertainment`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error('Save failed');
      }

      // Navigate back to the previous page or fallback to the list
      navigate(redirectBackTo);
    } catch (err) {
      console.error(err);
      alert('Something went wrong saving the entertainer.');
    }
  };

  return (
      <main className="main-container">
        <h2 className="text-center">
          {isEditMode ? 'Edit Entertainer' : 'Add Entertainer'}
        </h2>

        {/* Reusable form component with props passed in */}
        <EntertainerForm
          formData={formData}
          isEditMode={isEditMode}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </main>
  );
};

export default AddEntertainerPage;
