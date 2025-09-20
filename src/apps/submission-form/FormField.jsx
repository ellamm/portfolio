import ErrorMessage from "./ErrorMessage";
import styles from "./SubmissionForm.module.css";
export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  children, // <textarea>
}) {
  return (
    <>
      <div className={styles.formRow}>
        <label htmlFor={name} className={styles.formLabel}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            className={styles.formTextarea}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            aria-describedby={error && `${name}Error`}
            required={required}
            rows={2}
            cols={32}
          />
        ) : (
          <>
            <span>[</span>
            <input
              className={styles.formInput}
              type={type}
              id={name}
              name={name}
              value={type === "file" ? undefined : value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              aria-describedby={error && `${name}Error`}
              required={required}
              {...(type === "file" ? { accept: ".pdf,.doc,.docx" } : {})}
            />
            <span>]</span>
          </>
        )}
      </div>

      {children}

      <ErrorMessage error={error} fieldName={name} />
    </>
  );
}
