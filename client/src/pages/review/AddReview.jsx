import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function AddReview() {
     
    const [rating, setRating] = useState("")
    const [comment, setComment] = useState("")
    const { id } = useParams();
    const navigate = useNavigate();

    

    const handleAddReview = async () => {
        
        

        const data = {
            movieId: id,
            rating,
            comment
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/review/add-review",
                data,
                {
                    withCredentials: true,
                },
            );
            alert(res.data.message);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
              } else if (error.request) {
                alert("no response received from server");
              } else {
                alert("an error occured while adding Review");
              }
        }
    };
    

    return (

        <main className="py-10">
             <h3 className="underline text-red-500">Add your review here</h3>
            <div className="w-full bg-red-200 text-slate-900 border border-2 border-red-500 rounded-md">
               
            
                <div className="w-full w-1/2">
                   
                    <div className="flex flex-wrap mt-10 justify-center">
                        <p className="pr-2">please give your rating___</p>
                            <select
                                name="rating"
                                value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="bg-red-200 border-2 border-white"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <h6 className="pl-2">/ 5</h6>
                    </div>
                    <div className="flex flex-wrap">
                     <div className="w-full w-1/2 px-5">
                      <div className="border border-red-500 rounded-md h-[200px] mt-10">
                            <textarea
                               type="text"
                               placeholder="Review"
                               className="border border-red-500 text-base bg-gray-200 hover:bg-yellow-100 h-full w-full pl-2 text-slate-900 rounded-md resize-none"
                               value={comment}
                               onChange={(e)=>setComment(e.target.value)}
                            />
                      </div>
                     </div>
                       <div className="flex w-full w-1/2 mt-5 mb-10 justify-center items-center">
                             <button onClick={handleAddReview}
                                      className="border-2 h-[50px] w-[100px] hover:bg-red-100 bg-sky-300 font-bold border-blue-500 rounded-md px-5 py-2" 
                                    >
                                 Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       
        </main>



    )
}