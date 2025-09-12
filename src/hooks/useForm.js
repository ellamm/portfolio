import { useState } from "react";

export function useForm(initialValue, validateForm, validateField) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    setValues((prevValue) => {
      if (type === "checkbox" && name === "subjects") {
        const currentSubjects = prevValue.subjects || [];
        return {
          ...prevValue,
          subjects: checked
            ? [...currentSubjects, value]
            : currentSubjects.filter((s) => s !== value),
        };
      }

      if (type === "checkbox") {
        return { ...prevValue, [name]: checked };
      }

      if (type === "file") {
        return {
          ...prevValue,
          [name]: files[0] || null,
        };
      }

      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleBlur(e) {
    const { name } = e.target;

    const fieldsToValidateOnBlur = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "url",
      "about",
    ];

    if (fieldsToValidateOnBlur.includes(name)) {
      const fieldError = validateField(name, values[name], values);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      } else {
        setErrors((prev) => {
          const { [name]: _removed, ...rest } = prev;
          return rest;
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setSubmitSuccess(true);
      console.log("✅ Submit data:", values);
    } else {
      setSubmitSuccess(false);
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField);
        if (el) el.focus();
      }
    }
  }

  function handleReset() {
    setValues(initialValue);
    setErrors({});
    setSubmitSuccess(false);
    const firstInput = document.getElementById("firstName");
    if (firstInput) firstInput.focus();
  }

  return {
    values,
    errors,

    submitSuccess,
    handleChange,
    handleSubmit,
    handleReset,
    handleBlur,
  };
}
