import { useAuth } from "../context/AuthContext";

const FacultyDashboard = () => {
  const { user } = useAuth();
  console.log("Rendering FacultyDashboard"); // Add console log

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Faculty Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          {/* Add faculty-specific content here */}
        </>
      ) : (
        <p>Please log in to access the faculty dashboard.</p>
      )}
    </div>
  );
};

export default FacultyDashboard;
