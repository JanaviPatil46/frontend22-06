import React from 'react';

const EditJobForm = ({ job, onClose }) => {
    return (
        <div className="edit-job-form">
            <button onClick={onClose}>Close</button>
            <h2>Edit Job</h2>
            {/* Add your form fields here to edit the job */}
            <div>
                <label>Name:</label>
                <input type="text" defaultValue={job.Name} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" defaultValue={job.Description} />
            </div>
            {/* More fields as needed */}
        </div>
    );
};

export default EditJobForm;
