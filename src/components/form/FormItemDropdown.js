import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  error, onChange, placeholder, value, id, label, options
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
        {error !== undefined
        && (
        <div className="errorArea">
          {error[1]}
        </div>
        )}
      </div>
    </label>
  </div>
);

export default FormItemDropdown;
