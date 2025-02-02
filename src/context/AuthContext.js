import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("User state changed:", user); // Add console log
      if (user) {
        if (user.email === "jyothimaria2020@gmail.com") {
          console.log("Navigating to /"); // Add console log
          navigate("/");
        } else if (user.email === "jyothi222040@sahrdaya.ac.in") {
          console.log("Navigating to /admin"); // Add console log
          navigate("/admin");
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
