import Header from "../components/Header";
import Heading from "../components/shared/Heading";
import Button from "../components/shared/Button";
import BooksList from "../components/BooksList";
import ModalAddBook from "../components/ModalAddBook";
import { useState, useCallback } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

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
        <BooksList
          books={[
            {
              id: 1,
              title: "The Pragmatic Programmer",
              author: "Andrew Hunt and David Thomas",
              description: "Your journey to mastery",
              status: "Reading",
            },
            {
              id: 2,
              title: "Clean Code",
              author: "Robert C. Martin",
              description: "A Handbook of Agile Software Craftsmanship",
              status: "Completed",
            },
            {
              id: 3,
              title: "Refactoring",
              author: "Martin Fowler",
              description: "Improving the Design of Existing Code",
              status: "Completed",
            },
          ]}
        />
      </div>
      {/* Modal component */}
      {isModalOpen && <ModalAddBook setOpen={setIsModalOpen} />}
    </div>
  );
}
