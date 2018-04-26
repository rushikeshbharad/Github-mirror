import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import Modal from 'react-modal2';
import classnames from 'classnames/bind';
import Button, { BUTTON_TYPES } from '../button';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const Dialog = props => (
  <Modal
    onClose={props.onClose}
    closeOnEsc={props.closeOnEsc}
    closeOnBackdropClick={props.closeOnBackdropClick}
    backdropClassName={cx('backdrop')}
    modalClassName={cx('modal')}
  >
    <div className={cx('children')}>
      {props.children}
    </div>
    <div className={cx('buttons')}>
      {props.buttons.map((button, key) => (
        <Button
          key={key}
          classNames={cx('modal-button')}
          text={button.text}
          type={button.type}
          onClick={() => {
            props.onClose();
            button.onClick && button.onClick();
          }}
        />
      ))}
    </div>
  </Modal>
);

Dialog.proptypes = {
  buttons: arrayOf(shape({
    className: string,
    onClick: func,
    text: string,
    type: string
  })),
  onClose: func.isRequired
}

Dialog.defaultProps = {
  buttons: [{
    text: 'OK',
    type: BUTTON_TYPES.PRIMARY
  }],
  children: 'This feature is under development',
  closeOnEsc: true,
  closeOnBackdropClick: true
}

export default Dialog;
