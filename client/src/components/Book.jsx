import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "./form-elements/Label";
import Input from "./form-elements/Input";
import InputRadio from "./form-elements/InputRadio";
import Button from "./shared/Button";
import { useEditBookRequestMutation } from "../services/booksApi";
import { updateBook } from "../store/features/booksSlice";

export default function Book({ book, bookId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("id at the top of book ", bookId);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      description: book?.description || "",
      status: book?.status === "Completed" ? "1" : "0",
    },
  });

  console.log("book", book);

  const [editBookRequest, { data, isSuccess }] = useEditBookRequestMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("succr=ess!", isSuccess, "data", data);
      dispatch(updateBook(data));
      navigate("/");
    }
  }, [isSuccess, navigate, dispatch, data]);

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("description", book.description);
      setValue("status", book.status === "Completed" ? "1" : "0");
    }
  }, [book, setValue]);

  const onSubmit = (formData) => {
    console.log("formData", formData);
    // Trim formData values
    const trimmedFormData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      description: formData.description.trim(),
      status: formData.status,
      id: bookId,
    };

    editBookRequest(trimmedFormData);
  };

  watch("status");

  return (
    <div className="bg-purple-100 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2 text-violet-800">
        Edit book "{book.title}"
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <Label htmlFor="bookName" label="Book name" />
          <div className="mt-2">
            <Input
              id="bookName"
              name="title"
              type="text"
              autoComplete="off"
              inputConfig={register("title", { required: true })}
            />
          </div>
          {errors.title && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="bookAuthor" label="Book author" />
          <div className="mt-2">
            <Input
              id="bookAuthor"
              name="author"
              type="text"
              autoComplete="off"
              inputConfig={register("author", { required: true })}
            />
          </div>
          {errors.author && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="mt-3">
          <Label htmlFor="bookDescription" label="Book description" />
          <div className="mt-2">
            <Input
              id="bookDescription"
              name="description"
              type="text"
              autoComplete="off"
              inputConfig={register("description", { required: true })}
            />
          </div>
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <fieldset className="mt-3">
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Status
          </legend>

          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-x-3">
              <InputRadio
                id="status-reading"
                required
                value="0"
                inputConfig={register("status")}
              />
              <Label htmlFor="status-reading" label="Reading" />
            </div>
            <div className="flex items-center gap-x-3">
              <InputRadio
                id="status-completed"
                required
                value="1"
                inputConfig={register("status")}
              />
              <Label htmlFor="status-completed" label="Completed" />
            </div>
          </div>
        </fieldset>

        <div>
          <Button type="submit" additionalClasses="mt-4">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
