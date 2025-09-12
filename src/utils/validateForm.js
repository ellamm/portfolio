/**
 * Comprehensive form validation utility
 * @param {Object} data - Form data object
 * @param {Object} options - Validation options
 * @returns {Object} Object containing validation errors
 */
export function validateForm(data, options = {}) {
  const newErrors = {};

  // Default options with ability to customize requirements
  const {
    requireUrl = true,
    requireAbout = true,
    requireSubjects = true,
    requireResume = true,
    maxFileSize = 5 * 1024 * 1024, // 5MB default
    minNameLength = 2,
    maxNameLength = 50,
    maxAboutLength = 1000,
  } = options;

  // Helper function to check if string is empty or whitespace
  const isEmpty = (str) => !str || !str.toString().trim();

  // Helper function to check string length
  const isValidLength = (str, min = 0, max = Infinity) => {
    if (!str) return min === 0;
    const length = str.trim().length;
    return length >= min && length <= max;
  };

  // First Name validation
  if (isEmpty(data.firstName)) {
    newErrors.firstName = "First name is required.";
  } else if (!isValidLength(data.firstName, minNameLength, maxNameLength)) {
    newErrors.firstName = `First name must be between ${minNameLength} and ${maxNameLength} characters.`;
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.firstName.trim())) {
    newErrors.firstName =
      "First name can only contain letters, spaces, hyphens, and apostrophes.";
  }

  // Last Name validation
  if (isEmpty(data.lastName)) {
    newErrors.lastName = "Last name is required.";
  } else if (!isValidLength(data.lastName, minNameLength, maxNameLength)) {
    newErrors.lastName = `Last name must be between ${minNameLength} and ${maxNameLength} characters.`;
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.lastName.trim())) {
    newErrors.lastName =
      "Last name can only contain letters, spaces, hyphens, and apostrophes.";
  }

  // Email validation
  if (!data.email) {
    newErrors.email = "Email is required.";
  } else {
    // More comprehensive email regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(data.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    } else if (data.email.length > 254) {
      newErrors.email = "Email address is too long.";
    }
  }

  // Phone validation
  if (!data.phone) {
    newErrors.phone = "Phone number is required.";
  } else {
    // Remove all non-digits for validation
    const cleanPhone = data.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits.";
    } else if (cleanPhone.length > 15) {
      newErrors.phone = "Phone number cannot exceed 15 digits.";
    } else if (!/^[0-9+\-\s().]+$/.test(data.phone)) {
      newErrors.phone = "Phone number contains invalid characters.";
    }
  }

  // Gender validation
  if (!data.gender) {
    newErrors.gender = "Please select a gender.";
  } else {
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(data.gender)) {
      newErrors.gender = "Please select a valid gender option.";
    }
  }

  // Subjects validation (fixed from 'subject' to 'subjects')
  if (requireSubjects) {
    if (
      !data.subjects ||
      !Array.isArray(data.subjects) ||
      data.subjects.length === 0
    ) {
      newErrors.subjects = "Please choose at least one subject.";
    } else {
      const validSubjects = ["english", "math", "physics"];
      const invalidSubjects = data.subjects.filter(
        (subject) => !validSubjects.includes(subject)
      );
      if (invalidSubjects.length > 0) {
        newErrors.subjects = "Please select only valid subjects.";
      }
    }
  }

  // Resume file validation
  if (requireResume) {
    if (!data.resume) {
      newErrors.resume = "Resume file is required.";
    } else {
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(data.resume.type)) {
        newErrors.resume = "Resume must be a PDF, DOC, or DOCX file.";
      } else if (data.resume.size > maxFileSize) {
        const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
        newErrors.resume = `Resume file must be smaller than ${maxSizeMB}MB.`;
      } else if (data.resume.size === 0) {
        newErrors.resume = "Resume file appears to be empty.";
      }
    }
  }

  // URL validation
  if (requireUrl) {
    if (!data.url) {
      newErrors.url = "Portfolio URL is required.";
    } else {
      try {
        const url = new URL(data.url.trim());
        // Check if protocol is http or https
        if (!["http:", "https:"].includes(url.protocol)) {
          newErrors.url = "URL must start with http:// or https://";
        }
        // Optional: Check for reasonable domain
        else if (url.hostname.length < 3) {
          newErrors.url = "Please enter a valid domain name.";
        }
      } catch {
        newErrors.url = "Please enter a valid URL (e.g., https://example.com).";
      }
    }
  } else if (data.url && data.url.trim()) {
    // If URL is provided but not required, still validate format
    try {
      const url = new URL(data.url.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        newErrors.url = "URL must start with http:// or https://";
      }
    } catch {
      newErrors.url = "Please enter a valid URL format.";
    }
  }

  // Level validation
  if (!data.level) {
    newErrors.level = "Please choose your experience level.";
  } else {
    const validLevels = ["beginner", "intermediate", "expert"];
    if (!validLevels.includes(data.level)) {
      newErrors.level = "Please select a valid experience level.";
    }
  }

  // About validation
  if (requireAbout) {
    if (isEmpty(data.about)) {
      newErrors.about = "Please tell us something about yourself.";
    } else if (data.about.trim().length < 10) {
      newErrors.about = "Please provide at least 10 characters about yourself.";
    } else if (data.about.trim().length > maxAboutLength) {
      newErrors.about = `Description must be less than ${maxAboutLength} characters.`;
    }
  }

  // Terms acceptance validation
  if (!data.acceptTerms) {
    newErrors.acceptTerms =
      "You must accept the terms and conditions to continue.";
  }

  return newErrors;
}

/**
 * Validates a single field - useful for real-time validation
 * @param {string} fieldName - Name of the field to validate
 * @param {any} value - Value to validate
 * @param {Object} formData - Complete form data (needed for context)
 * @param {Object} options - Validation options
 * @returns {string|null} Error message or null if valid
 */
export function validateField(fieldName, value, formData = {}, options = {}) {
  const tempData = { ...formData, [fieldName]: value };
  const errors = validateForm(tempData, options);
  return errors[fieldName] || null;
}

/**
 * Checks if form has any validation errors
 * @param {Object} data - Form data to validate
 * @param {Object} options - Validation options
 * @returns {boolean} True if form is valid, false otherwise
 */
export function isFormValid(data, options = {}) {
  const errors = validateForm(data, options);
  return Object.keys(errors).length === 0;
}

/**
 * Gets a summary of validation errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {Object} Summary with error count and field names
 */
export function getErrorSummary(errors) {
  const errorFields = Object.keys(errors);
  return {
    hasErrors: errorFields.length > 0,
    errorCount: errorFields.length,
    errorFields: errorFields,
    firstError: errorFields.length > 0 ? errors[errorFields[0]] : null,
  };
}
