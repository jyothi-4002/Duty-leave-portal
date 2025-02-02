import { useAuth } from "../context/AuthContext";
import RequestLeaveForm from "../components/RequestLeaveForm";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    if (user) {
      const q = query(collection(db, "leaveRequests"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      setLeaveRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [user]);

  const renderLeaveRequests = (status) => {
    return leaveRequests
      .filter(request => request.status === status)
      .map(request => (
        <div key={request.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
          <p><b>Date:</b> {request.date}</p>
          <p><b>Reason:</b> {request.reason}</p>
          <p><b>Status:</b> {request.status}</p>
        </div>
      ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {user ? (
        <>
          <p className="text-xl mb-4">Welcome, {user.displayName}!</p>
          <RequestLeaveForm onSubmit={fetchLeaveRequests} /> {/* Pass fetchLeaveRequests as onSubmit prop */}
          <h3 className="text-2xl font-bold mt-8 mb-4">Pending Requests</h3>
          {renderLeaveRequests("pending")}
          <h3 className="text-2xl font-bold mt-8 mb-4">Approved Requests</h3>
          {renderLeaveRequests("approved")}
        </>
      ) : (
        <p className="text-xl">Please log in to request a leave.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
