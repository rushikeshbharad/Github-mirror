import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Dialog from '../components/dialog';
import Button from '../components/button';
import RepoGrid from '../components/repo-grid';
import { getRepoDetails, updateRepoInfo } from '../actions';
import RedirectLink from '../components/redirect-link';
import Styles from './repos.css';

const cx = classnames.bind(Styles);

class Repos extends Component {
  constructor(props) {
    super(props);

    const { currentRepo = {} } = props;
    const { description, website } = currentRepo;
    this.state = {
      shouldDisplayModal: false,
      hasDescription: !!(description || website),
      isEditingDescription: false,
      description: ''
    }
  }

  openModal = () => {
    this.setState({
      shouldDisplayModal: true
    })
  }

  closeModal = () => {
    this.setState({
      shouldDisplayModal: false
    })
  }

  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  }

  onWebsiteChange = e => {
    this.setState({
      website: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    const { currentRepo = {} } = nextProps;
    const { description = '', website = '' } = currentRepo;
    this.setState({
      hasDescription: !!(description || website),
      description,
      website
    })
  }

  componentDidMount() {
    getRepoDetails(
      this.props.match.params.username,
      this.props.match.params.reponame
    )(this.props.dispatch);
  }

  renderHeader() {
    const { history: { push }, match: { params: { username, reponame } } } = this.props;
    return (
      <div className={cx('repo-header')}>
        <div className={cx('repo-icon')} />
        <div className={cx('repo-username')}>
          <RedirectLink
            text={username}
            path={`/${username}`}
            redirectTo={push}
          />
        </div>
        <div className={cx('divider')}>{' / '}</div>
        <div className={cx('repo-name')}>
          <RedirectLink
            text={reponame}
            path={`/${username}/Repositories/${reponame}`}
            redirectTo={push}
          />
        </div>
      </div>
    );
  }

  renderEditInfo() {
    return (
        <div className={cx('repo-info-container')}>
          <div className={cx('repo-description-container')}>
            <div className={cx('repo-edit-description')}>
              <div className={cx('repo-description-label')}>{'Description'}</div>
              <input
                className={cx('repo-info-input-description')}
                type="text"
                onChange={this.onDescriptionChange}
                placeholder="Description"
                value={this.state.description}
              />
            </div>
            <div className={cx('repo-edit-website')}>
              <div className={cx('repo-website-label')}>{'Website'}</div>
              <input
                className={cx('repo-info-input-website')}
                type="text"
                placeholder="Url"
                onChange={this.onWebsiteChange}
                value={this.state.website}
              />
            </div>
          </div>
          <div className={cx('repo-edit-button-container')}>
            <Button
              text="Save"
              onClick={() => {
                this.setState({ isEditingDescription: false });
                updateRepoInfo(
                  this.props.match.params.username,
                  this.props.match.params.reponame,
                  this.state.description,
                  this.state.website
                )(this.props.dispatch);
              }}
              classNames={cx('')}
              buttonClassName={cx('repo-description-button')}
            />
            <Button
              text="Cancel"
              onClick={() => {
                this.setState({ isEditingDescription: false });
              }}
              classNames={cx('')}
              buttonClassName={cx('repo-description-button')}
            />
          </div>
        </div>
      );
  }

  renderRepoInfo() {
    if (this.state.isEditingDescription) {
      return this.renderEditInfo();
    }

    const { currentRepo = {} } = this.props;
    const { description = '', website = '' } = currentRepo;
    const absoluteWebistePath = website.includes('https://') ? website : `https://${website}`;
    const Info = (description || website)
      ? (
        <Fragment>
          <div className={cx('repo-description')}>{description}</div>
          {website ? <a className={cx('repo-website')} href={absoluteWebistePath} target="_blank">{website}</a> : ''}
        </Fragment>
      )
      : (
        <div className={cx('repo-description')}>
          {'You can add description and website to this repository.'}
        </div>
      );
    return (
      <div className={cx('repo-info-container')}>
        <div className={cx('repo-description-container')}>{Info}</div>
        <Button
          text={this.state.hasDescription ? 'Edit' : 'Add'}
          onClick={() => {
            this.setState({ isEditingDescription: true });
          }}
          classNames={cx('')}
          buttonClassName={cx('repo-description-button')}
        />
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <div className={cx('repo-container')}>
          {this.renderHeader()}
          {this.renderRepoInfo()}
          {
            this.props.currentRepo && this.props.currentRepo.directoryStructure &&
            <RepoGrid directoryStructure={this.props.currentRepo.directoryStructure} />
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ state }) => ({ ...state });

export default connect(mapStateToProps)(Repos);
