import classNames from 'classnames';
import { bool, func, string } from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import styles from './TextField.module.css';

const propTypes = {
  name: string.isRequired,
  textarea: bool,
  className: string,
  onChange: func,
  error: string,
  isFocused: bool
};

const TextField = ({
  name,
  textarea,
  className,
  onChange,
  error,
  isFocused,
  ...props
}) => {
  const ref = useRef();

  const checkValidity = useCallback(() => {
    const element = ref.current;
    const error =
      element && !element.validity.valid ? element.validationMessage : '';

    return error;
  }, []);

  const changeHandler = e => {
    const error = checkValidity();

    if (onChange) {
      onChange({ name, value: e.target.value, error });
    }
  };

  const element = textarea ? (
    <textarea
      {...props}
      className={classNames(styles.textarea, className, {
        [styles.invalid]: Boolean(error)
      })}
      rows="3"
      ref={ref}
      onChange={changeHandler}
    />
  ) : (
    <input
      {...props}
      className={classNames(styles.input, className, {
        [styles.invalid]: Boolean(error)
      })}
      ref={ref}
      onChange={changeHandler}
    />
  );

  useEffect(() => {
    if (isFocused) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [isFocused]);

  return (
    <label className={classNames(styles.label, className)}>
      {element}
      <span
        className={classNames(styles.error, {
          [styles.hidden]: !error
        })}
      >
        {error}
      </span>
    </label>
  );
};

TextField.propTypes = propTypes;

export { TextField };
