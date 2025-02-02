import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const RequestLeaveForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, "leaveRequests"), {
        email: user.email,
        date,
        reason,
        status: "pending"
      });
      setDate("");
      setReason("");
      if (onSubmit) {
        onSubmit(); // Call onSubmit prop to refresh leave requests
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Submit</button>
    </form>
  );
};

export default RequestLeaveForm;
