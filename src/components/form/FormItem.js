import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, error
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <input
          className={`${styles.input} ${error !== undefined ? '.errorArea' : ''}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
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

export default FormItem;
