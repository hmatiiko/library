import Header from "../components/Header";
import Book from "../components/Book";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { selectBookById } from "../store/features/booksSlice";
import { useGetBooksRequestQuery } from "../services/booksApi";
import { setBooks } from "../store/features/booksSlice";

export default function EditBook() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get("token") || Cookies.get("token") === "undefined") {
      navigate("/login");
    }
  }, [navigate]);

  const { data: books = [], error, isLoading } = useGetBooksRequestQuery();

  useEffect(() => {
    if (books.length > 0) {
      dispatch(setBooks(books));
    }
  }, [books, dispatch]);

  const selectedBook = useSelector((state) => selectBookById(id)(state));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!selectedBook) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <div>id {id}</div>
        <Book book={selectedBook} bookId={id} />
      </div>
    </div>
  );
}
