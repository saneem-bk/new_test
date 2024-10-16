import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  releaseDate: yup.date().required("Release date is required").typeError("Invalid date format"),
  genre: yup.string().required("Genre is required"),
  director: yup.string().required("Director is required"),
  cast: yup
    .array()
    .of(
      yup.object({
        role: yup.string().required("Role is required"),
        name: yup.string().required("Name is required"),
      })
    )
    .min(1, "At least one cast member is required"),
}).required();

export default function UpdateMovie() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cast: [{ role: "", name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast",
  });

  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/movie/details/${id}`);
        const movieData = res.data.data.movieDetails;

       
        reset({
          title: movieData.title,
          description: movieData.description,
          releaseDate: movieData ? movieData.releaseDate.split("T")[0] : "", 
          genre: movieData.genre,
          director: movieData.director,
          cast: movieData.cast,
        });

        setExistingImage(movieData.image); 
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("releaseDate", data.releaseDate);
    formData.append("genre", data.genre);
    formData.append("director", data.director);

    data.cast.forEach((castMember, index) => {
      formData.append(`cast[${index}][role]`, castMember.role);
      formData.append(`cast[${index}][name]`, castMember.name);
    });

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
      formData.append("imageUrl", existingImage);
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/movie/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
        alert(res.data.message);
        navigate(`/admin/movies/${id}`);
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("no response received from server");
      } else {
        alert("an error occured while adding movie");
      }
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <main>
        <div className="flex justify-center mx-2">
         <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-sky-900 flex-wrap gap-y-2 rounded-md border border-red-400 p-6 max-w-[350px] my-8"
         >
          
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
       
          <input
          {...register("director")}
            type="text"
            placeholder="Director"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.director && <p className="text-sm text-red-500">{errors.director.message}</p>}
          
          <input
            {...register("releaseDate")}
            type="date"
            placeholder="Release Date"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.releaseDate && <p className="text-sm text-red-500">{errors.releaseDate.message}</p>}
          
          <input
            {...register("genre")}
            type="text"
            placeholder="Genre"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.genre && <p className="text-sm text-red-500">{errors.genre.message}</p>}
          
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
         
          
            
          <h4 className="text-lg font-semibold">Cast</h4>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-x-2">
              <input
                {...register(`cast[${index}].role`)}
                placeholder="Role"
                className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                {...register(`cast[${index}].name`)}
                placeholder="Name"
                className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ role: "", name: "" })} className="text-blue-500">
            Add Cast
          </button>
          {errors.cast && <p className="text-sm text-red-500">{errors.cast.message}</p>}

          
          {existingImage && (
            <div className="text-white">
              <p>Current Image:</p>
              <img src={existingImage} alt="Current Movie Poster" className="w-24 h-36" />
            </div>
          )}

         
          <input
            {...register("image")}
            type="file"
            className="block w-full rounded-lg border border-red-300 bg-neutral-200 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}

          <input
            type="submit"
            className="rounded-md bg-lime-400 py-1 text-white hover:bg-lime-500 cursor-pointer"
            value="Update Movie"
          />
        </form>
      </div>
    </main>
  );
}