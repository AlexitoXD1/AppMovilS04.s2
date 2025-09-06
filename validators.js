export const validateName = (name) => {
  if (!name) return 'El nombre es obligatorio';
  if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'El nombre solo puede contener letras';
  return '';
};

export const validateEmail = (email) => {
  if (!email) return 'El correo es obligatorio';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'El correo debe tener un formato válido';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) return 'Debe confirmar la contraseña';
  if (confirmPassword !== password) return 'Las contraseñas no coinciden';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return 'El teléfono es obligatorio';
  if (!/^\d{10}$/.test(phone)) return 'El teléfono debe tener 10 dígitos';
  return '';
};