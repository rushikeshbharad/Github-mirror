import React, { Fragment } from 'react';
import { func, string } from 'prop-types'
import classnames from 'classnames/bind';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const RedirectLink = ({ text, path, redirectTo }) => (
  <div
    className={cx('redirect-link')}
    onClick={() => {
      redirectTo(path);
    }}
  >
    {text}
  </div>
);

RedirectLink.proptypes = {
  text: string,
  path: string,
  redirectTo: func
};

export default RedirectLink;
