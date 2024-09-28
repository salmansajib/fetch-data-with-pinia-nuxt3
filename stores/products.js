import { defineStore } from "pinia";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);

  const fetchProducts = async () => {
    try {
      const { data } = await useFetch("/products.json");
      products.value = data.value;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return { products, fetchProducts };
});
