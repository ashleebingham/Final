import React from 'react';
import { Entertainer } from '../types/Entertainer';
import { fieldLabels } from '../types/Labels';

// Props expected by the EntertainerForm component
type Props = {
  formData: Omit<Entertainer, 'entertainerId'>; // Form fields excluding the ID
  isEditMode: boolean; // Whether we're editing an existing entertainer
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
  onSubmit: (e: React.FormEvent) => void; // Handler for form submission
};

/**
 * A reusable form component for creating or editing an entertainer.
 * Displays each field from formData as a labeled input.
 */
const EntertainerForm: React.FC<Props> = ({
  formData,
  isEditMode,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="entertainer-form-wrapper">
      <form onSubmit={onSubmit} className="entertainer-form">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-row">
            <label htmlFor={key}>{fieldLabels[key] || key}</label>
            <input
              id={key}
              name={key}
              type={key === 'dateEntered' ? 'date' : 'text'}
              value={value ?? ''}
              onChange={onChange}
              required
            />
          </div>
        ))}

        <div className="text-center">
          <button type="submit">
            {isEditMode ? 'Save Changes' : 'Add Entertainer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntertainerForm;
