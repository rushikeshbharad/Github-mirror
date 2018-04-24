import React, { Component, Fragment } from 'react';
import { shape, string } from 'prop-types'
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Overview from '../components/overview'
import Repository from '../components/repository'
import Dialog from '../components/dialog';
import Button from '../components/button';
import { getUserDetails } from '../actions';
import { getDisplayDateTime } from '../helper';
import { NAV_BUTTON_NAMES } from '../constants/profile';
import Styles from './profile.css';

const cx = classnames.bind(Styles);

class Profile extends Component {
  static proptypes = {
    match: shape({
      params: {
        username: string
      }
    })
  }

  static defaultProps = {
    match: {
      params: {
        username: 'username'
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      shouldDisplayModal: false
    }
  }

  openModal = () => {
    this.setState({
      shouldDisplayModal: true
    });
  }

  closeModal = () => {
    this.setState({
      shouldDisplayModal: false
    });
  }

  componentWillReceiveProps(nextProps) {
    const { detailItem } = this.props.match.params;
    this.setState({currentHover: detailItem})
  }

  componentDidMount() {
    getUserDetails(this.props.match.params.username)(this.props.dispatch);
  }

  getDetailItemComponent = detailItem => {
    switch(detailItem) {
      case 'Repositories': {
        return <Repository />;
      } case 'Stars': {
        return <div />
      } case 'Followers': {
        return <div />
      } case 'Following': {
        return <div />
      } default: {
        return <Overview />;
      }
    }
  }

  getNavButtonText = navItem => {
    switch(navItem) {
      case 'Stars': {
        const stars = this.props.stars;
        return (!stars || !Object.keys(stars).length) ? `${navItem} (0)` : `${navItem} (${Object.keys(stars).reduce((total, repoName) => {
          total += stars[repoName] * 1;
          return total;
        }, 0)})`;
      } case 'Followers': {
        const followers = this.props.followers;
        return (followers && followers.length) ? `${navItem} (${followers.length})` : `${navItem} (0)`;
      } case 'Following': {
        const following = this.props.following;
        return (following && following.length) ? `${navItem} (${this.props.following.length})` : `${navItem} (0)`;
      } case 'Repositories': {
        const repositories = this.props.repositories;
        return (repositories && repositories.length) ? `${navItem} (${repositories.length})` : `${navItem} (0)`;
      } default: {
        return navItem;
      }
    }
  }

  renderInfo() {
    return (
      <div className={cx('info')}>
        <div className={cx('avatar')} />
        <div className={cx('username')}>{this.props.match.params.username}</div>
        <Button
          text={`Add photo`}
          onClick={this.openModal}
        />
        <Button
          text={`Edit profile`}
          onClick={this.openModal}
        />
        <div className={cx('separator')} />
        <div className={cx('joined-at')}>{getDisplayDateTime({
          timestamp:this.props.joinedAt * 1,
          prefix: 'Joined ',
          suffix: ' ago'
        })}</div>
      </div>
    );
  }

  renderDetailNavs() {
    const basePath = `/${this.props.match.params.username}`;
    const { detailItem } = this.props.match.params;
    const navButtons = NAV_BUTTON_NAMES.map((navItem, key) => (
      <div key={key} className={cx('nav-button-holder')}>
        <Button
          key={key}
          text={this.getNavButtonText(navItem)}
          buttonClassName={cx('nav-button', navItem)}
          classNames={cx('nav-button-container', navItem)}
          onClick={() => {
            this.props.history.push(`${basePath}/${navItem}`)
          }}
          onMouseOver={() => {
            this.setState({currentHover: navItem})
          }}
          onMouseOut={() => {
            this.setState({currentHover: false})
          }}
        />
        <div
          className={cx(
            'nav-button-underline',
            this.state.currentHover === navItem ? 'hover' : '',
            detailItem === navItem ? 'active' : ''
          )}
        />
      </div>
    ));

    return (
      <div className={cx('nav-buttons-holder')}>
        {navButtons}
      </div>
    );
  }

  renderDetails() {
    const { detailItem } = this.props.match.params;
    return (
      <div className={cx('details')}>
        {this.renderDetailNavs()}
        <div className={cx('separator', 'nav-buttons-separator')} />
        {React.cloneElement(this.getDetailItemComponent(detailItem), {...this.props})}
      </div>
    );
  }

  render() {
    return (
      <div className={cx('container')}>
        {this.renderInfo()}
        {this.renderDetails()}
        {this.state.shouldDisplayModal && <Dialog onClose={this.closeModal} />}
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({ ...state });

export default connect(mapStateToProps)(Profile);
