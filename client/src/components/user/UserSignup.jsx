import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string()
        .required()
        .oneOf([yup.ref('password')], 'passwords must match')
});

    



export default function Signup() {

   
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });


    
    
    const onSubmit = async (data) => {
        try {
            

            const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                data,
                {
                    withCredentials: true,
                },
            );
            const success = await res.data.message;
            alert(success);
            console.log(success);
            navigate("/user/signin")
           

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
                <h3 className="text-2xl text-red-500 font-bold underline">SignUp</h3>
           <div className="flex flex-wrap mt-8">    
            <label>Name :</label> 
            <input
                {...register("name")}
                placeholder="Name"
                className="block w-full my-4 rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div> 
          <div className="flex flex-wrap">    
           <label>Email :</label>  
           <input
                {...register("email")}
                placeholder="email"
                autoComplete="email"
                className="block w-full my-4 rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
           <div className="flex flex-wrap">    
             <label>password :</label> 
             <input
                {...register("password")}
                placeholder="password"
                autoComplete="new-password"
                type="password"
                className="block w-full my-4 rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    
           </div>
                
            <div className="flex flex-wrap">    
             <label>confirm password :</label> 
             <input
                {...register("confirmPassword")}
                placeholder="confirm password"
                autoComplete="new-password"
                type="password"
                className="block w-full my-4 rounded-lg border-2 border-gray-600 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500"
            />
             {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <input type="submit" className="rounded-md border-3 bg-red-500 py-1 p-3  mt-5 text-white" />
                    
            <p className="flex justify-between text-white">
                Already signed Up{" "}
                <Link to="/user/signin" className="text-lime-400 underline"  >
                    Sign In
                </Link>
            </p>
          </div>
        </form>
    );

};