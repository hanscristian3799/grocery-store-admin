import axios from "./axios";

export const getProducts = async () => {
  try {
    const products = await axios.get("/products");
    return products.data;
  } catch (error) {
    throw  new Error(error.message);
  }
};
