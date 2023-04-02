import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editProduct, getProductsById } from "@/helper/data-fetch/controller";
import Swal from "sweetalert2";
import {
  QUERY_KEY_PRODUCT,
  QUERY_KEY_PRODUCTS,
} from "@/helper/data-fetch/constant";
import Router, { useRouter } from "next/router";
import Loading from "@/components/Loading";

const EditProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const editProductMutation = useMutation({
    mutationFn: (data) => editProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    editProductMutation.mutate(data);
  };

  const { isLoading, isError, error, data } = useQuery(
    [QUERY_KEY_PRODUCT, id],
    () => getProductsById(id),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let defaultValues = {};
        defaultValues.id = data.id;
        defaultValues.name = data.name;
        defaultValues.description = data.description;
        defaultValues.price = data.price;
        defaultValues.image = data.image;
        reset({ ...defaultValues });
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <Loading size={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 font-bold text-red-500">Error: {error.message}</div>
    );
  }

  if (editProductMutation.isLoading) {
    Swal.fire({
      position: "top-end",
      text: "Adding Product...",
      showConfirmButton: false,
      allowOutsideClick: false,
      width: 300,
    });
  }

  if (editProductMutation.isError) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      text: editProductMutation.error,
      showConfirmButton: false,
      timer: 1000,
      width: 300,
    });
  }

  if (editProductMutation.isSuccess) {
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
      <h3 className="mb-4 self-start font-bold text-xl">Edit Product</h3>
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

export default EditProduct;
