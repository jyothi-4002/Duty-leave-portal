import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Modal from "../components/Modal"; // Import Modal component

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState(""); // State for popup message

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "leaveRequests"));
    setRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await updateDoc(doc(db, "leaveRequests", id), { status });
    setMessage(`Request ${status}`); // Set popup message
    setTimeout(() => {
      fetchRequests(); // Refresh leave requests after showing the message
    }, 1000); // Delay to allow the modal to be visible
  };

  const closeModal = () => {
    setMessage(""); // Close the modal
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {message && <Modal message={message} onClose={closeModal} />} {/* Show modal if message is set */}
      {requests.map(req => (
        <div key={req.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
          <p><b>Date:</b> {req.date}</p>
          <p><b>Reason:</b> {req.reason}</p>
          <p><b>Status:</b> {req.status}</p>
          {req.status === "pending" && (
            <div className="mt-4">
              <button onClick={() => handleUpdateStatus(req.id, "approved")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Approve</button>
              <button onClick={() => handleUpdateStatus(req.id, "denied")} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">Deny</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
