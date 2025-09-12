import styles from "./SubmissionForm.module.css";
import { useForm } from "../../hooks/useForm.js";
import { validateForm, validateField } from "../../utils/validateForm.js";
import { useRef } from "react";
import FormField from "./FormField.jsx";
import CheckboxGroup from "./CheckboxGroup.jsx";
import RadioGroup from "./RadioGroup";
import SelectField from "./SelectField";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  subjects: [],
  resume: null,
  url: "",
  level: "",
  about: "",
  acceptTerms: false,
};

export default function SubmissionForm() {
  const successRef = useRef(null);
  const {
    values,
    errors,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useForm(initialState, validateForm, validateField);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Accessible Form</h1>
        <FormField
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
          placeholder="Enter First Name"
          required
        />

        <FormField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          placeholder="Enter Last Name"
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="Enter email"
          required
        />

        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="Enter phone Number"
          required
        />
        <small id="phoneHelp" className="srOnly">
          Enter digits only (10–15 numbers).
        </small>

        <RadioGroup
          legend="Gender"
          name="gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "other" },
          ]}
          value={values.gender}
          onChange={handleChange}
          error={errors.gender}
          required
        />

        <CheckboxGroup
          legend="Your Best Subjects"
          name="subjects"
          options={[
            { value: "english", label: "English" },
            { value: "math", label: "Math" },
            { value: "physics", label: "Physics" },
          ]}
          values={values.subjects}
          onChange={handleChange}
          error={errors.subjects}
          required
        />

        <FormField
          label="Upload Resume"
          name="resume"
          type="file"
          onChange={handleChange}
          error={errors.resume}
          required
        />
        <small id="resumeHelp" className="srOnly">
          Accepted formats: PDF, DOC, DOCX with 1GB limit
        </small>

        <FormField
          label="Enter URL"
          name="url"
          type="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.url}
          placeholder="https://example.com"
          required
        />

        <SelectField
          label="Select your level"
          name="level"
          value={values.level}
          onChange={handleChange}
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "intermediate" },
            { value: "expert", label: "Expert" },
          ]}
          error={errors.level}
          required
        />

        <FormField
          label="About"
          name="about"
          type="textarea"
          value={values.about}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.about}
          placeholder="Tell us something about yourself..."
          required
        />

        <div className={styles.termsContainer}>
          <input
            className={styles.termsCheckbox}
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="acceptTerms" className={styles.termsLabel}>
            <span aria-hidden="true">*</span> I agree to the terms and
            conditions
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={submitSuccess}
            className={styles.formButton}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.formButton}
          >
            Reset
          </button>
        </div>
      </form>
      {submitSuccess && (
        <div
          className={styles.success}
          role="status"
          aria-live="polite"
          tabIndex="-1"
          ref={successRef}
        >
          Form submitted successfully! ✅
        </div>
      )}
    </div>
  );
}
