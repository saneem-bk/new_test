import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/Rating";

export default function Reviews() {

  const [reviews, setReviews] = useState("");
  const { id } = useParams();

    useEffect(() => {
        const getReviews = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/api/v1/review/movie-review/${id}`);
            const data = res.data;
            if (data.message === "No reviews found for this movie") {
              setReviews([]);
            } else {
              console.log("Reviews", data);
              setReviews(data);
            } 
          } catch (error) {
            console.log(error);
           
          }
        };
        getReviews();
      }, []);


  return (
    
       <div className="py-10">
        
          <h2 className="text-xl text-red-500 font-bold mb-4 underline">User Reviews</h2>
          <div className="w-full">
            <ul className="gap-4">
              {reviews.length > 0 ? (
                reviews && reviews.map((review, index) => (
                  <li key={index}>
                    <div className="my-5 mx-20 bg-neutral-200 border-2 border-bg-slate-600">
                      <div className="flex justify-between pr-2 mb-2">
                        <span className="text-sm text-slate-600 pl-2 pt-1 font-bold">{review.userId.name}</span>
                        <span className="text-xs text-gray-500 pt-1 pr-2">{review.createdAt}</span>
                      </div>
                      <p className="text-slate-600 border-4 p-2 border-white text-lg mx-2 my-4">{review.comment}</p>
                      <div className="flex justify-end pr-2 pb-1">
                        <Rating rating={review.rating} />
                      </div>
                    </div>
                  </li>
                ))) : (
                <div className="flex justify-center mt-10">
                  <h3>no reviews yet</h3>
                </div>
              )}
                    
            </ul>
          </div>
        </div>
      
      
    )
}