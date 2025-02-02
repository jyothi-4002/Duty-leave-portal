import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

// Function to create a leave request
export const createLeaveRequest = async (studentId, leaveDetails) => {
  await addDoc(collection(db, 'leaveRequests'), {
    studentId: studentId,
    leaveDetails: leaveDetails,
    status: 'pending'
  });
};

// Function for faculty to update leave request status
export const updateLeaveRequestStatus = async (requestId, status) => {
  const requestRef = doc(db, 'leaveRequests', requestId);
  await updateDoc(requestRef, {
    status: status
  });
};