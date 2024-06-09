export default function Book() {
  // You can fetch book data from your API or use local data
  const book = {
    title: "Sample Book Title",
    author: "Sample Author",
    description: "Sample Description",
    status: "Sample Status",
  };

  return (
    <div className="bg-purple-100 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2 text-violet-800">{book.title}</h3>
      <p className="text-gray-600">
        <span className="font-bold">Author:</span> {book.author}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">Description:</span> {book.description}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">Status:</span> {book.status}
      </p>
    </div>
  );
}
