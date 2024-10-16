import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const AdminLogout = () => {
  
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post("http://localhost:3000/api/v1/admin/logout",{}, {
                    withCredentials: true,
                });

                navigate("/admin/signin");
        
            } catch (error) {
                console.error("Error logging out", error);
            }
        }
    logout();
    }, [navigate]);

    return null;
  };