import toastr from "toastr";
import $ from "jquery";
import validate from "jquery-validation";
import { get, update } from "../../../api/category";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import Input from "../../../components/Input";

const editCategory = {
  idCategory: 0,
  async print(id) {
    this.idCategory = id;
    const { data } = await get(id);
    return /* html */ `
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">Edit category</h2>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            ${Form.print(/* html */ `
              ${Input.print("text", "Title", "Title new", data.title)}
              <div class="w-[100px] py-3 text-right">
                ${Button.print("Save")}
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  },
  async afterRender(id) {
    $("#form").validate({
      submitHandler() {
        async function submit() {
          const category = {
            title: document.getElementById("Title").value,
          };
          try {
            await update(category, id);
            return toastr.success("Successfully");
          } catch (error) {
            return error;
          }
        }
        submit();
      },
    });
  },
};

export default editCategory;
