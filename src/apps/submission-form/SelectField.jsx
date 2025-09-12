import ErrorMessage from "./ErrorMessage";
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}) {
  return (
    <>
      <label htmlFor={name}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <span>[</span>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={error ? `${name}Error` : undefined}
      >
        <option value="">Please select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span>]</span>
      <ErrorMessage error={error} fieldName={name} />
    </>
  );
}
