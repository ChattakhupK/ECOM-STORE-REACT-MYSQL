import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/products";
import useEcomStore from "../../store/ecom-store";
import { LoaderCircle } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // []
      for (let i = 0; i < files.length; i++) {
        //validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not match!`);
          continue;
        }
        // Resize img
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            //endpoint BE
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload image Sucess!!!");
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  console.log(form);

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        const fillerImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setForm({
          ...form,
          images: fillerImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-3">
      <div className="flex gap-4 my-4">
        {isLoading && <LoaderCircle className="w-16 h-16 animate-spin" />}

        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img src={item.url} className="w-24 h-24 hover:scale-105" />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="cursor-pointer absolute -top-1 right-1 bg-red-500 rounded-md py-1 px-1"
            >
              x
            </span>
          </div>
        ))}
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          for="multiple_files"
        >
          Upload multiple files
        </label>
        <input
          id="multiple_files"
          className="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
        />
      </div>
    </div>
  );
};

export default Uploadfile;
