import Label from "./form-elements/Label";
import Input from "./form-elements/Input";
import Button from "./shared/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import InputRadio from "./form-elements/InputRadio";
import { useSendCreateBookRequestMutation } from "../services/booksApi";
import { addCreatedBook } from "../store/features/booksSlice";

export default function ModalAddBook({ setOpen, children }) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "reading",
    },
  });

  const [sendCreateBookRequest, { data, error }] =
    useSendCreateBookRequestMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addCreatedBook(data));
      handleClose();
    }
  }, [data, dispatch, handleClose]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (formData) => {
    // Trim formData values
    const trimmedFormData = {
      bookName: formData.bookName.trim(),
      bookAuthor: formData.bookAuthor.trim(),
      bookDescription: formData.bookDescription.trim(),
      bookStatus: formData.status,
    };

    sendCreateBookRequest(trimmedFormData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-1/3">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
        <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <Label htmlFor="bookName" label="Book name" />
            <div className="mt-2">
              <Input
                id="bookName"
                name="bookName"
                type="text"
                autoComplete="off"
                inputConfig={register("bookName", { required: true })}
              />
            </div>
            {errors.bookName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="mt-3">
            <Label htmlFor="bookAuthor" label="Book author" />
            <div className="mt-2">
              <Input
                id="bookAuthor"
                name="bookAuthor"
                type="text"
                autoComplete="off"
                inputConfig={register("bookAuthor", { required: true })}
              />
            </div>
            {errors.bookAuthor && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="mt-3">
            <Label htmlFor="bookDescription" label="Book description" />
            <div className="mt-2">
              <Input
                id="bookDescription"
                name="bookDescription"
                type="text"
                autoComplete="off"
                inputConfig={register("bookDescription", { required: true })}
              />
            </div>
            {errors.bookDescription && (
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
                  value="reading"
                  inputConfig={register("status")}
                />
                <Label htmlFor="status-reading" label="Reading" />
              </div>
              <div className="flex items-center gap-x-3">
                <InputRadio
                  id="status-completed"
                  required
                  value="completed"
                  inputConfig={register("status")}
                />
                <Label htmlFor="status-completed" label="Completed" />
              </div>
            </div>
          </fieldset>

          <div>
            <Button type="submit" additionalClasses="mt-4">
              Add book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
