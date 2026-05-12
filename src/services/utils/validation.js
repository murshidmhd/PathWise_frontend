const GMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export function isValidEmail(email) {
  return GMAIL_REGEXP.test(email.trim().toLowerCase());
}

export function isValidName(name) {
  const nameRegex = /^[a-zA-Z\s-]+$/;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50 && nameRegex.test(trimmed);
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  // const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpper || !hasLower || !hasNumber) {
    return "Password must contain uppercase, lowercase, number, and special character";
  }

  return "";
}
