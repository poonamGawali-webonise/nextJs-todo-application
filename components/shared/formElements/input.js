import { useState, useEffect } from 'react';

const defaultErrorText = '';

export function FormInput({
  type='text',
  placeholder='',
  inputName='',
  inputClassNames='',
  inputValue='',
  validationRules=[],
  onChange=() => {},
  inputRef=null,
  formSubmit=false,
}) {
  const [errorText, setErrorText] = useState(defaultErrorText);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if(formSubmit) {
      const element = inputRef.current.parentElement;
      const newValue = inputRef.current.value
      const isValid = validate(newValue);
      checkError(element, inputRef.current.value, isValid)
    }
  }, [formSubmit])

  const validate = (val) => validationRules.map(validationRule => validationRule(val)).every(Boolean);

  const checkError = (element, value, isValid) => {
    if (value) {
      if (!isValid) {
        element.classList.add('errorActive');
        setErrorText(`Please Enter a Valid ${inputName}`);
      } else {
        element.classList.remove('errorActive');
      }
    } else {
      // element.classList.add('errorActive');
      // setErrorText(`Please Enter a ${inputName}`);
    }
  }

  const onFieldFocusOut = (e) => {
    const newValue = event.target.value;
    const isValid = validate(newValue);
    const element = e.target.parentElement;

    element.classList.remove('focusActive');

    checkError(element, newValue, isValid);

    if (newValue) {
      element.classList.add('inputFilled');
    }

    if (!isDirty) {
      setIsDirty(true);
    }
  }

  const onFieldFocusIn = (e) => {
    const element = e.target.parentElement;
    element.classList.add('focusActive');
    element.classList.remove('inputFilled');
  }

  const onValueChange = (e) => {
    const element = e.target.parentElement;
    const newValue = e.target.value;
    const isValid = validate(newValue);

    if (isValid) {
      setErrorText(defaultErrorText);
      element.classList.remove('errorActive');
    } else if (isDirty) {
      checkError(element, newValue, isValid);
    }

    onChange(e, newValue, isValid);
  }

  return (
    <div className="inputWrap">
      <span>{placeholder}</span>
      <input
        type={type}
        ref={inputRef}
        className={inputClassNames}
        placeholder={placeholder}
        value={inputValue}
        name={inputName}
        onChange={onValueChange}
        onFocus={onFieldFocusIn}
        onBlur={onFieldFocusOut}
      />
      {
        errorText && <div className="errorMsg">{errorText}</div>
      }
    </div>
  )
}
