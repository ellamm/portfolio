import ErrorMessage from "./ErrorMessage";
import styles from "./SubmissionForm.module.css";
export default function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  required,
}) {
  return (
    <fieldset
      aria-describedby={error ? `${name}Error` : undefined}
      className={styles.radioGroup}
    >
      <legend>
        {legend}
        {required && <span aria-hidden="true">*</span>}
      </legend>
      {options.map((opt) => (
        <div key={opt.value} className={styles.radioOptions}>
          <input
            className={styles.radioInput}
            type="radio"
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
          <label htmlFor={`${name}-${opt.value}`} className={styles.radioLabel}>
            {opt.value}
          </label>
        </div>
      ))}
      <ErrorMessage error={error} fieldName={name} />
    </fieldset>
  );
}
