import axios from "axios";
import toastr from "toastr";
import $ from "jquery";
import validate from "jquery-validation";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import previewImages from "../../../utils/previewImages";
import { add } from "../../../api/post";

const addNews = {
  print() {
    return /* html */ `
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Add news</h2>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            ${Form.print(/* html */ `
              ${Input.print("text", "Title", "Title new")}
              ${Input.print("file", "Cover photo", "")}
              ${Input.print("textarea", "Content", "Content new")}
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
      inputElement.addEventListener("change", function () {
        previewImages(this.files);
        listImgs = this.files;
      });
    }

    $("#form").validate({
      submitHandler() {
        async function submit() {
          const formData = new FormData();
          formData.append("file", listImgs[0]);
          formData.append("upload_preset", "axplfcjl");
          const { data } = await axios.post(
            "https://api.cloudinary.com/v1_1/dqtnuqde5/image/upload",
            formData,
            {
              "Content-Type": "application/x-www-form-endcoded",
            },
          );

          const news = {
            title: document.getElementById("Title").value,
            img: data.secure_url,
            desc: document.getElementById("Content").value,
          };

          try {
            await add(news);
            toastr.success("Successfully");
          } catch (error) {
            toastr.error("Error");
          }
        }
        submit();
      },
    });
  },
};

export default addNews;
