import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8)
})

    .required();


export default function Signin() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });


    
   

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                data,
                {
                    withCredentials: true,
                },
            );
            const success = await res.data.message;
            console.log(success);
            alert(success);
            navigate("/user/home")
        

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex justify-center text-slate-800 py-20"
        >
         
         <div className="w-full bg-emerald-300 border border-red-600 rounded-md p-10 max-w-[500px] mx-10">
          <h3 className="text-2xl text-red-500 font-bold underline">SignIn</h3>
          <div className="flex flex-wrap mt-8">    
            <label>Email :</label>  
            <input
                {...register("email")}
                placeholder="email"
                autoComplete="user-email"
                className="block w-full rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-wrap mt-8">    
            <label>Password :</label>
            <input
                {...register("password")}
                placeholder="password"
                autoComplete="current-password"
                type="password"
                className="block w-full rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
             {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
            <input type="submit" className="rounded-md border-3 bg-red-500 py-1 p-3  mt-5 text-white" />
            <p className="text-white">
                if you haven't signed up yet - {" "}
                <Link to="/user/signup" className="text-lime-400 underline"  >
                    Sign Up
                </Link>
            </p>
         </div>
        </form>
    );

};