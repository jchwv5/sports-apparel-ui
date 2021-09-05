import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, isValid, errorMessage
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <input
          className={`${errorMessage ? styles.inputError : styles.input}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {isValid === false
        && (
        <div className={styles.errorText}>
          {errorMessage}
        </div>
        )}
      </div>
    </label>
  </div>
);

export default FormItem;
