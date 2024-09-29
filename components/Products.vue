<script setup>
import { useProductStore } from "/stores/products";
import { Star } from "lucide-vue-next";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

// function to limit the description to a specific words
const truncateDescription = (description) => {
  const words = description.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : description;
};

// Store visibility states for each product
const showFullDescription = ref({});

// Toggle description visibility
const toggleDescription = (id) => {
  showFullDescription.value[id] = !showFullDescription.value[id];
};
</script>

<template>
  <section class="max-w-[95%] md:container mx-auto">
    <div class="flex justify-center flex-wrap gap-x-5 gap-y-10">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="bg-slate-50 max-w-[300px] p-4 shadow-md rounded-[15px]"
      >
        <div class="relative rounded-[10px] overflow-hidden">
          <img :src="product.img" alt="" />
          <div
            class="absolute top-[10px] right-[10px] flex items-center gap-1 bg-blue-600 px-[10px] py-[2px] rounded-full"
          >
            <Star :size="12" color="#f9fafb" />
            <span class="text-gray-50 text-[12px]">{{ product.rating }}</span>
          </div>
        </div>
        <h3 class="my-2 font-medium text-gray-900 text-[18px]">
          {{ product.name }}
        </h3>
        <p class="text-gray-700 flex flex-col items-start">
          {{
            showFullDescription[product.id]
              ? product.description
              : truncateDescription(product.description)
          }}
          <button @click="toggleDescription(product.id)" class="text-blue-600">
            {{ showFullDescription[product.id] ? "Show less" : "Show more" }}
          </button>
        </p>
        <div class="">
          <h2 class="mt-3 text-[20px] font-semibold">{{ product.price }}$</h2>
          <p class="text-lime-700 text-[14px]">{{ product.stock }} In stock</p>
        </div>
        <div class="mt-3 flex items-center gap-3">
          <button
            class="bg-blue-700 text-gray-50 w-full py-1 rounded-full hover:scale-105 transition-all"
          >
            Add to cart
          </button>
          <button
            class="bg-blue-700 text-gray-50 w-full py-1 rounded-full hover:scale-105 transition-all"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
