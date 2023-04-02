import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../../zustand/index";
import { useMutation, useQueryClient } from "react-query";
import { addProduct } from "@/helper/data-fetch/controller";
import Swal from "sweetalert2";
import { QUERY_KEY_PRODUCTS } from "@/helper/data-fetch/constant";
import Router from "next/router";

const CreateProduct = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newData = {
      id: lastId + 1,
      ...data,
    };
    addProductMutation.mutate(newData);
  };

  const addProductMutation = useMutation({
    mutationFn: (data) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS });
    },
  });

  const lastId = useStore((state) => state.lastId);

  if (addProductMutation.isLoading) {
    Swal.fire({
      position: "top-end",
      text: "Adding Product...",
      showConfirmButton: false,
      allowOutsideClick: false,
      width: 300,
    });
  }

  if (addProductMutation.isError) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      text: addProductMutation.error,
      showConfirmButton: false,
      timer: 1000,
      width: 300,
    });
  }

  if (addProductMutation.isSuccess) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Success",
      showConfirmButton: false,
      timer: 1000,
      width: 300,
      willClose: () => {
        Router.back();
      },
    });
  }

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <h3 className="mb-4 self-start font-bold text-xl">Create Product</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5 bg-[#E4F8F0] w-full rounded-lg"
      >
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
            htmlFor="p-name"
          >
            Product Name <span className="text-red-500">(*)</span>
          </label>
          <input
            id="p-name"
            className={`text-gray-700 border w-full rounded py-2 px-4 focus:outline-none focus:bg-white ${
              errors.name ? "mb-1" : "mb-3"
            }`}
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true, maxLength: 80 })}
          />
          {errors.name && (
            <p className="mb-3 text-sm text-red-500">Name cannot be empty.</p>
          )}
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
            htmlFor="p-desc"
          >
            Product Description <span className="text-red-500">(*)</span>
          </label>
          <textarea
            id="p-desc"
            className={`text-gray-700 border w-full rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white resize-none h-[100px] ${
              errors.description ? "mb-1" : "mb-3"
            }`}
            placeholder="Product Name"
            {...register("description", { required: true, maxLength: 200 })}
          />
          {errors.description && (
            <p className="mb-3 text-sm text-red-500">
              Description cannot be empty.
            </p>
          )}
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
            htmlFor="p-price"
          >
            Price <span className="text-red-500">(*)</span>
          </label>
          <input
            id="p-price"
            className={`text-gray-700 border w-full rounded py-2 px-4 focus:outline-none focus:bg-white ${
              errors.price ? "mb-1" : "mb-3"
            }`}
            type="number"
            placeholder="Price"
            {...register("price", { required: true, pattern: /\d+/ })}
          />
          {errors.price && (
            <p className="mb-3 text-sm text-red-500">
              Please enter number for price.
            </p>
          )}
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
            htmlFor="p-URL"
          >
            Image URL
          </label>
          <input
            id="p-URL"
            className="text-gray-700 border w-full rounded py-2 px-4 mb-3 focus:outline-none focus:bg-white"
            type="text"
            placeholder="Image URL"
            {...register("image", { required: false, maxLength: 200 })}
          />
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <button
            className="mt-3 w-1/4 bg-[#159895] px-3 py-2 rounded font-normal text-white mb-4 hover:bg-[#117A77] float-right"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
