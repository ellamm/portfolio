import ErrorMessage from "./ErrorMessage";
import styles from "./SubmissionForm.module.css";
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
      <label htmlFor={name} className={styles.formLabel}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <span>[</span>
      <select
        className={styles.formSelect}
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
