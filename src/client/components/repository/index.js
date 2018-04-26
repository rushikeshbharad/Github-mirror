import React, { Fragment } from 'react';
import { arrayOf, func, shape, string } from 'prop-types'
import classnames from 'classnames/bind';
import { getDisplayDateTime } from '../../helper';
import RedirectLink from '../redirect-link'
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const Repositories = ({ basePath, repositories: repos, history: { push } }) => {
  if (!repos) {
    return null;
  }

  return repos.map(({ name, description, technology, updatedAt }) => (
    <div className={cx('repository-repo-holder')}>
      <div className={cx('repository-repo-name')}>
        <RedirectLink
          text={name}
          redirectTo={push}
          path={`${basePath}${name}`}
        />
      </div>
      <div className={cx('repository-repo-description')}>{description}</div>
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

const Repository = (props) => {
  const basePath = `/${props.match.params.username}/Repositories/`
  return (
    <Repositories basePath={basePath} repositories={props.repositories} history={props.history} />
  );
};

export default Repository;
