import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, TextArea } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>
        <TextArea
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          maxlength={250}
          rows={3}
          {...rest}
        />
      </div>
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: null,
};
