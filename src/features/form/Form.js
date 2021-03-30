import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  selectForm,
} from './formSlice';
import {
  setFormId,
  selectFormId,
} from './navigationSlice';
import styles from './Form.module.css';

export function Form() {
  const formId = useSelector(selectFormId)
  console.log(formId)
  const allForms = useSelector(selectForm)    
  const thisForm = allForms[formId]

  const [form, setForm] = useState(thisForm)
  console.log(thisForm)
  const dispatch = useDispatch()

  function handleChange(e) {
        const {id, value} = e.currentTarget;
        setForm({ ...form, [id]: value})      
    }

    function saveForm() {
      console.log('saveForm', form)
      dispatch(update(form))
    }

  return (
    <div>
    <div className={styles.row}>
        FormId {formId}
    </div>
      <div className={styles.row}>
        <input
          id="address1"
          className={styles.textbox}
          aria-label="address1:"
          value={form.address1}
          onChange={e => handleChange(e)}
        />
        </div>
        <div className={styles.row}>
        <input
          id="address2"
          className={styles.textbox}
          aria-label="address2:"
          value={form.address2}
          onChange={e => handleChange(e)}
        />
        </div>
      <div className={styles.row}>
      <button
          className={styles.button}
          onClick={() =>
            dispatch(setFormId("0"))
          }
        >
          Back (0)
        </button>
        <button
          className={styles.button}
          onClick={() =>
            saveForm()
          }
        >
          Save Forms
        </button>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(setFormId("1"))
          }
        >
          Next (1)
        </button>
      </div>
    </div>
  );
}
