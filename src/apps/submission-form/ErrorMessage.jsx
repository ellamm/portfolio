import styles from "./SubmissionForm.module.css";
export default function ErrorMessage({ error, fieldName }) {
  if (!error) return null;
  return (
    <span
      id={`${fieldName}Error`}
      className={styles.error}
      role="alert"
      aria-live="polite"
    >
      {error}
    </span>
  );
}
