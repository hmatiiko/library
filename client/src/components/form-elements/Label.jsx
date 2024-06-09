export default function Label({ htmlFor, label }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
  );
}
