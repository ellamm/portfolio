import ErrorMessage from "./ErrorMessage";
import styles from "./SubmissionForm.module.css";
export default function CheckboxGroup({
  legend,
  name,
  options,
  values,
  onChange,
  error,
  required,
}) {
  return (
    <fieldset
      aria-describedby={error ? `${name}Error` : undefined}
      className={styles.checkboxGroup}
    >
      <legend className={styles.formLegend}>
        {legend} {required && <span aria-hidden="true">*</span>}
      </legend>

      {options.map((opt) => (
        <div key={opt.value}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            checked={values.includes(opt.value)}
            onChange={onChange}
          />

          <label
            htmlFor={`${name}-${opt.value}`}
            className={styles.checkboxLabel}
          >
            {opt.label}
          </label>
        </div>
      ))}

      <ErrorMessage error={error} fieldName={name} />
    </fieldset>
  );
}
