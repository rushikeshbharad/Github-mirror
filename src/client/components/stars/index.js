import React, { Fragment } from 'react';
import { arrayOf, func, shape, string } from 'prop-types'
import classnames from 'classnames/bind';
import RedirectLink from '../redirect-link'
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const Stars = ({ stars, match }) => {
  const basePath = `/${match.params.username}/Repositories/`
  if (!stars || !stars.length) {
    return (
      <div className={cx('no-stars-container')}>
        
      </div>
    );
  }

  return repos.map(({ name, technology, updatedAt }) => (
    <div className={cx('repository-repo-holder')}>
      <div className={cx('repository-repo-name')}>
        <RedirectLink
          text={name}
          redirectTo={push}
          path={`${basePath}${name}`}
        />
      </div>
      <div className={cx('repository-repo-values-holder')}>
        <div className={cx('repository-repo-tech')}>{technology}</div>
        <div className={cx('repository-repo-updated-at')}>{getDisplayDateTime({
          timestamp: updatedAt * 1,
          prefix: 'Updated ',
          suffix: ' ago'
        })}</div>
      </div>
    </div>
  ));
}

Repositories.proptypes = {
  repositories: arrayOf(shape({
    name: string,
    technology: string
  })),
  history: shape({
    push: func
  })
}

export default Repository;