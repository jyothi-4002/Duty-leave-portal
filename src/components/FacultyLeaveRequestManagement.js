import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const FacultyLeaveRequestManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'leaveRequests'));
      const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaveRequests(requests);
    };

    fetchLeaveRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    await updateDoc(doc(db, 'leaveRequests', requestId), { status });
    setLeaveRequests(leaveRequests.map(req => req.id === requestId ? { ...req, status } : req));
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaveRequests.map(request => (
          <li key={request.id}>
            {request.leaveDetails} - {request.status}
            <button onClick={() => handleUpdateStatus(request.id, 'accepted')}>Accept</button>
            <button onClick={() => handleUpdateStatus(request.id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyLeaveRequestManagement;