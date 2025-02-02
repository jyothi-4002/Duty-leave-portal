import React, { useState } from 'react';
import { createLeaveRequest } from '../firebase/leaveRequests';
import { auth } from '../firebase/firebaseConfig';

const StudentLeaveRequestForm = () => {
  const [leaveDetails, setLeaveDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = auth.currentUser.uid;
    await createLeaveRequest(studentId, leaveDetails);
    setLeaveDetails('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={leaveDetails}
        onChange={(e) => setLeaveDetails(e.target.value)}
        placeholder="Enter leave details"
      />
      <button type="submit">Submit Leave Request</button>
    </form>
  );
};

export default StudentLeaveRequestForm;