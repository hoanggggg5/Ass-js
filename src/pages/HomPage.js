import axios from "axios";
import productFeature from "../components/product-feature";

const HomePage = {
  print: async () => {
    const newProduct = await axios.get(
      `http://localhost:3001/products?_sort=id&_order=asc&_limit=4`
    );
    return `
    <div class="bg-[#f1f3f6] py-6">
      <div class="banner max-w-7xl mx-auto">
        <img class="w-full" src="https://images.samsung.com/is/image/samsung/assets/vn/galaxy-registration/Hero-Reg-pc.jpg"/>
      </div>
      <div class="bg-white mt-6 shadow border-[1px] max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 class="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          New products
        </h2>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          ${newProduct.data
            .map(
              (product) => /* html */ `
            <div class="group relative z-10">
              <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src="${product.image}" alt="Front of men&#039;s Basic Tee in black." class="w-full h-full object-center object-cover lg:w-full lg:h-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#/product/${product.id}">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      ${product.name}
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">${product.desc}</p>
                </div>
                <p class="text-sm font-medium text-gray-900">$${product.price}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="bg-white mt-6 shadow border-[1px] max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 class="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          All product
        </h2>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          ${productFeature.print()}
        </div>
      </div>
    </div>
  `;
  },
};

export default HomePage;
