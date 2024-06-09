export default function Button({ type, children, onClick, additionalClasses }) {
  const baseClasses =
    "flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${additionalClasses || ""}`}
    >
      {children}
    </button>
  );
}
