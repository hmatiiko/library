export default function Input({ id, type, autoComplete, inputConfig }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      {...inputConfig}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
}
