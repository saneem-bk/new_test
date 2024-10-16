import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const UserLogout = () => {
  
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
    try {
        await axios.post("http://localhost:3000/api/v1/user/logout", {},{
        withCredentials: true,
      });

        navigate("/user/signin");
        
    } catch (error) {
      console.error("Error logging out", error);
    }
  }
    logout();
    }, []);
};