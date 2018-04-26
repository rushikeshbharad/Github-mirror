import React, { Fragment } from 'react';
import { arrayOf, func, shape, string } from 'prop-types'
import classnames from 'classnames/bind';
import RedirectLink from '../redirect-link'
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const Repositories = ({ basePath, repositories: repos, history: { push } }) => {
  if (!repos) {
    return null;
  }

  return repos.map(({ name, technology }) => (
    <div className={cx('overview-repo-holder')}>
      <div className={cx('overview-repo-name')}>
        <RedirectLink
          text={name}
          redirectTo={push}
          path={`${basePath}${name}`}
        />
      </div>
      <div className={cx('overview-repo-tech')}>{technology}</div>
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

const Overview = (props) => {
  const basePath = `/${props.match.params.username}/Repositories/`
  return (
    <Fragment>
      <div className={cx('overview-header')}>
        <div className={cx('overview-title')}>Popular repositories</div>
        <div className={cx('overview-value')}>Access your repositories</div>
      </div>
      <Repositories basePath={basePath} repositories={props.repositories} history={props.history} />
    </Fragment>
  );
};

export default Overview;
