import axios from "./axios";

export const getProducts = async () => {
  try {
    const products = await axios.get("/products");
    return products.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsById = async (id) => {
  try {
    const product = await axios.get(`/products/${id}`);
    return product.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProduct = async (data) => {
  try {
    const products = await axios.post(`/products`, data);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProduct = async (data) => {
  try {
    const product = await axios.put(`/products/${data.id}`, data);
    return product;
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
