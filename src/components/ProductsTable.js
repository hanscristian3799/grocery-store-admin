import { usdFormatter } from "@/helper/helper-functions";
import React from "react";

const ProductsTable = ({data}) => {
  return (
    <div className="mt-8 mb-4">
      <div className="flex flex-row justify-end">
        <button className="bg-[#159895] px-3 py-2 rounded font-normal text-white mb-4 hover:bg-[#117A77]">
          Add Product
        </button>
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
                  <button className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded font-normal">
                    View
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white font-normal">
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
