import { usdFormatter } from "@/helper/helper-functions";
import { QUERY_KEY_PRODUCTS } from "@/helper/data-fetch/constant";
import { deleteProduct } from "@/helper/data-fetch/controller";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import Link from "next/link";

const ProductsTable = ({ data }) => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS });
    },
  });

  if (deleteProductMutation.isLoading) {
    Swal.fire({
      position: "top-end",
      text: "Deleting Product...",
      showConfirmButton: false,
      allowOutsideClick: false,
      width: 300,
    });
  }

  if (deleteProductMutation.isSuccess) {
    Swal.close();
  }

  if (deleteProductMutation.isError) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      text: deleteProductMutation.error,
      showConfirmButton: false,
      timer: 1000,
      width: 300,
    });
  }

  return (
    <div className="mb-4">
      <div className="flex flex-row justify-end">
        <Link
          href="/product/add"
          className="bg-[#159895] px-3 py-2 rounded font-normal text-white mb-4 hover:bg-[#117A77]"
        >
          Add Product
        </Link>
      </div>
      <table className="table-auto bg-red-50 w-full rounded-md shadow-gray-800 overflow-hidden">
        <thead className="bg-[#159895] rounded-t-md">
          <tr>
            <th className="text-left font-medium p-4 text-white">Product ID</th>
            <th className="text-left font-medium p-4 text-white">
              Product Name
            </th>
            <th className="text-left font-medium p-4 text-white">
              Product Price
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => {
            return (
              <tr key={product.id} className="bg-[#C7E5E6]">
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{usdFormatter.format(product.price)}</td>
                <td className="p-4 flex flex-row items-center justify-end gap-2">
                  <Link
                    href={`product/edit/${product.id}`}
                    className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded font-normal"
                  >
                    View
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white font-normal"
                    onClick={() => deleteProductMutation.mutate(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
