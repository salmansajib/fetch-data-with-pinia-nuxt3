<script setup>
import { useProductStore } from "/stores/products";
import { Star } from "lucide-vue-next";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

// function to limit the description to specific words
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
            <div class="mb-[1px]">
              <svg
                width="13"
                height="11"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.55356 0.774127C7.86157 -0.128685 9.13843 -0.128687 9.44644 0.774124L10.6264 4.23272C10.7645 4.63765 11.145 4.90983 11.5728 4.90983H15.2834C16.2639 4.90983 16.6588 6.17425 15.8525 6.73216L12.9358 8.75034C12.5681 9.00477 12.414 9.47237 12.5584 9.89556L13.692 13.2184C14.0034 14.1312 12.9697 14.9124 12.1766 14.3636L9.06901 12.2134C8.72665 11.9765 8.27335 11.9765 7.93099 12.2134L4.82345 14.3636C4.03034 14.9124 2.99659 14.1312 3.308 13.2184L4.44164 9.89556C4.58602 9.47237 4.43191 9.00477 4.06421 8.75034L1.14754 6.73216C0.341251 6.17425 0.736055 4.90983 1.71655 4.90983H5.42717C5.85502 4.90983 6.23546 4.63765 6.37361 4.23272L7.55356 0.774127Z"
                  fill="#f9fafb"
                />
              </svg>
            </div>
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
          <button
            @click="toggleDescription(product.id)"
            class="text-blue-600 text-sm"
          >
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
