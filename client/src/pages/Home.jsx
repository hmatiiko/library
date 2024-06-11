import Header from "../components/Header";
import Heading from "../components/shared/Heading";
import Button from "../components/shared/Button";
import BooksList from "../components/BooksList";
import ModalAddBook from "../components/ModalAddBook";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBooks } from "../store/features/booksSlice";
import { useGetBooksRequestQuery } from "../services/booksApi";
import { setBooks } from "../store/features/booksSlice";

export default function Home() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  let books = useSelector(selectBooks);

  const { data, error, isLoading } = useGetBooksRequestQuery();

  useEffect(() => {
    if (data) {
      dispatch(setBooks(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <Heading
          headingLevel="h3"
          className="mb-4 mt-5 mr-8 ext-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
        >
          My bookshelf
        </Heading>

        <Button additionalClasses="w-32" onClick={handleOpen}>
          Add book
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </Button>
        <BooksList books={books} />
      </div>
      {/* Modal component */}
      {isModalOpen && <ModalAddBook setOpen={setIsModalOpen} />}
    </div>
  );
}
