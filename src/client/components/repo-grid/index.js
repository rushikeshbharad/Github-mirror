import React from 'react';
import { shape, string } from 'prop-types'
import classnames from 'classnames/bind';
import Styles from './styles.css';

const cx = classnames.bind(Styles);

const Row = ({ name, fileType }) => (
  <div className={cx('repo-grid-row')}>
    <div className={cx('repo-filename-container')}>
      <div className={fileType ? cx('repo-file-icon') : cx('repo-directory-icon')} />
      <div className={cx('repo-filename')}>{name}</div>
    </div>
    <div className={cx('repo-filetype')}>{fileType || 'Directory'}</div>
  </div>
);

Row.prototype = {
  name: string,
  fileType: string
};

const RepoGrid = ({ directoryStructure }) => ([
  Object.keys(directoryStructure).map(key =>
    <Row
      key={key}
      name={key}
      fileType={typeof directoryStructure[key] === 'object' ? false : directoryStructure[key]}
    />
  )
]);

RepoGrid.proptypes = {
  directoryStructure: shape
};

export default RepoGrid;
