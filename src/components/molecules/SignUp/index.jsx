import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@/components/atoms/Button';

import './SignUp.scss';

export default function SignUp({ createUser }) {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, required: isRequired } = e.target;

    const nextValues = {...formValues};
    nextValues[name] = value;

    const nextErrors = {...formErrors };
    nextErrors.general = null;

    if (isRequired) {
      if (nextValues[name]) {
        nextErrors[name] = null;
      } else if (e.target.required) {
        nextErrors[name] = 'Required';
      }
    }

    if (['password', 'confirmPassword'].includes(name) && value) {
      // only throw the mismatch error if both fields have a value. This is so we don't give the user
      // a warning before they even got to the confirm password field.
      const passwordMismatch = name === 'password' && formValues.confirmPassword && value !== formValues.confirmPassword
        || name === 'confirmPassword' && formValues.password && value !== formValues.password;
      nextErrors.confirmPassword = passwordMismatch ? 'Passwords do not match' : null;
    }

    setFormErrors(nextErrors);
    setFormValues(nextValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});

    createUser(formValues)
      .catch((r) => {
        switch (r.error?.code) {
          case 'VALIDATION_ERROR': {
            setFormErrors(r.error.details);
            break;
          }
          default: {
            setFormErrors({ general: 'Something went wrong. Please try again.'});
          }
        }
      });
  };

  return (
    <div id="signup">
      <div className="container">
        <form className="signup" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <div className={classNames('form-control', formErrors?.email && 'error')}>
            <label htmlFor="username">Username*</label>
            <input required type="text" id="username" name="username" value={formValues.username} onChange={handleChange} />
            {formErrors?.username && <span className="error-message">{formErrors.username}</span>}
          </div>
          <div className={classNames('form-control', formErrors?.password && 'error')}>
            <label htmlFor="password">Password*</label>
            <input required type="password" id="password" name="password" value={formValues.password} onChange={handleChange} />
            {formErrors?.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          <div className={classNames('form-control', formErrors?.confirmPassword && 'error')}>
            <label htmlFor="confirm">Confirm Password*</label>
            <input required type="password" id="confirm" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} />
            {formErrors?.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </div>
          <div className="actions">
            <Button block size="lg" type="submit">Create Account</Button>
            {formErrors?.general && <span className="error-message">{formErrors.general}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  createUser: PropTypes.func.required,
};