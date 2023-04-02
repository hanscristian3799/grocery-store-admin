import axios from "./axios";

export const getProducts = async () => {
  try {
    const products = await axios.get("/products");
    return products.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const products = await axios.delete(`/products/${id}`);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};
