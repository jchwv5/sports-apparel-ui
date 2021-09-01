import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  isValid, errorMessage, onChange, placeholder, value, id, label, options
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <select
          className={styles.input}
          id={id}
          onBlur={onChange}
          value={value}
        >
          <option
            value={placeholder}
            key={placeholder}
          >
            {placeholder}
          </option>
          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
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

export default FormItemDropdown;
