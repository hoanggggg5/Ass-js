import axios from "axios";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import previewImages from "../../../utils/previewImages";
import toastr from "toastr";

const editProduct = {
  idProduct: 0,
  async print(id) {
    this.idProduct = id;
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    const categories = await axios.get("http://localhost:3001/categories");
    return /* html */ `
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Edit product</h2>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            ${Form.print(/* html */ `
              ${Input.print("text", "Name product", "Name product", data.name)}
                <div class="col-span-6 sm:col-span-3">
                  <label for="category" class="block text-sm font-medium text-gray-700">category</label>
                  <select id="category" name="category" autocomplete="category-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    ${categories.data
                      .map((item) => {
                        return /* html */ `
                        <option>${item.title}</option>
                        `;
                      })
                      .join("")}
                  </select>
                </div>
              ${Input.print(
                "text",
                "Price product",
                "Price product",
                data.price
              )}
              ${Input.print("file", "Photo product", "", data.image)}
              ${Input.print("textarea", "Desc", "Desc product", data.desc)}
              <div class="w-[100px] py-3 text-right">
                ${Button.print("Save")}
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  },
  afterRender() {
    const inputElement = document.querySelector("#file-upload");
    let listImgs;

    if (inputElement) {
      inputElement.addEventListener("change", handleFiles);
      function handleFiles() {
        previewImages(this.files);
        listImgs = this.files;
      }
    }

    const formAdd = document.getElementById("form");
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      let image;

      if (listImgs) {
        const formData = new FormData();
        formData.append("file", listImgs[0]);
        formData.append("upload_preset", "axplfcjl");
        try {
          const { data } = await axios({
            url: "https://api.cloudinary.com/v1_1/dqtnuqde5/image/upload",
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-endcoded",
            },
            data: formData,
          });
          image = data.secure_url;
        } catch (error) {
          console.log(error);
        }
      }

      const product = {
        name: document.getElementById("Name product").value,
        category: document.getElementById("category").value,
        price: document.getElementById("Price product").value,
        desc: document.getElementById("Desc").value,
        image: image ? image : document.querySelector("#image").src,
      };
      try {
        await axios.put(
          `http://localhost:3001/products/${this.idProduct}`,
          product
        );
        toastr.success("Successfully");
      } catch (error) {
        toastr.error(error);
      }
    });
  },
};

export default editProduct;
