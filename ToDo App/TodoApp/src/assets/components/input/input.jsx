import React from 'react';
import styles from './Input.module.css';

function Input({ valueKey, Textvalue, label }) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={styles.input}
        value={valueKey}
        onChange={Textvalue}
        placeholder="Type your task..."
      />
    </div>
  );
}

export default Input;
