import BookListItem from "./BookListItem";

export default function BooksList({ books }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ">
      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        books &&
        books.map((book) => (
          <BookListItem
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            description={book.description}
            status={book.status}
          />
        ))
      )}
    </div>
  );
}
