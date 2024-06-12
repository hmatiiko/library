export default function InputRadio({ id, value, onChange, inputConfig }) {
  return (
    <input
      id={id}
      type="radio"
      value={value}
      name={inputConfig.name}
      ref={inputConfig.ref}
      onChange={inputConfig.onChange}
      onBlur={inputConfig.onBlur}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
    />
  );
}
