import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
      setFormData({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: ''
      });
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.username.trim()) {
      errors.username = 'Ім\'я користувача обов\'язкове';
    }
    if (!data.email.trim()) {
      errors.email = 'Електронна пошта обов\'язкова';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Введіть дійсну адресу електронної пошти';
    }
    if (!data.password.trim()) {
      errors.password = 'Пароль обов\'язковий';
    } else if (data.password.length < 6) {
      errors.password = 'Пароль повинен містити принаймні 6 символів';
    }
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Номер телефону обов\'язковий';
    }
    if (!data.birthDate.trim()) {
      errors.birthDate = 'Дата народження обов\'язкова';
    }
    return errors;
  };

  return (
    <div>
      {submittedData ? (
        <div className="submitted-data">
          <h2>Дякуємо за відправку!</h2>
          <p>Отримані дані:</p>
          <p><strong>Ім'я користувача:</strong> {submittedData.username}</p>
          <p><strong>Електронна пошта:</strong> {submittedData.email}</p>
          <p><strong>Пароль:</strong> {submittedData.password}</p>
          <p><strong>Номер телефону:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Дата народження:</strong> {submittedData.birthDate}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Ім'я користувача:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Електронна пошта:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Номер телефону:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <label>Дата народження:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}
          </div>
          <button type="submit" className="submit-btn">Відправити</button>
        </form>
      )}
    </div>
  );
};

export default Form;
