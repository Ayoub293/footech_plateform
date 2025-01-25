const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6;  // يجب أن تكون كلمة المرور أطول من 6 حروف
  };
  
  module.exports = { validateEmail, validatePassword };
  