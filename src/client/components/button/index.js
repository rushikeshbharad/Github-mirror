import React from 'react';
import { func, oneOf, string } from 'prop-types';
import classnames from 'classnames/bind';
import Styles from './styles.css';

const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DESTRUCTIVE: 'destructive'
}

const cx = classnames.bind(Styles);

const Button = ({ classNames, buttonClassName, type, onClick, text, ...otherProps }) => (
  <div className={cx('button-container', classNames)}>
    <button
      className={cx(type, buttonClassName)}
      type='button'
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
      {...otherProps}
    >
      {text}
    </button>
  </div>
);

Button.proptypes = {
  buttonClassName: string,
  classNames: string,
  onClick: func,
  text: string,
  type: oneOf([...BUTTON_TYPES])
}

Button.defaultProps = {
  onClick: () => {},
  text: 'Button',
  type: BUTTON_TYPES.SECONDARY
}

export { BUTTON_TYPES };

export default Button;
