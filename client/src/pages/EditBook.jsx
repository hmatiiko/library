import Header from "../components/Header";
import Book from "../components/Book";
import { useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <div>id {id}</div>
        <Book />
      </div>
    </div>
  );
}
