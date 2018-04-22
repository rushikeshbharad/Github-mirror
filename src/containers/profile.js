import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { shape, string } from 'prop-types'
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Dialog from '../components/dialog';
import Button from '../components/button';
import { getUserDetails } from '../actions';
import { getJoiningAt } from '../helper';
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
    this.props.dispatch(getUserDetails(this.props.match.params.username));
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
        <div className={cx('joined-at')}>{getJoiningAt(this.props.joinedAt * 1)}</div>
      </div>
    );
  }

  renderDetailNavs() {
    const basePath = `/${this.props.match.params.username}`;
    const { detailItem } = this.props.match.params;
    return ['Overview', 'Repository', 'Stars', 'Followers', 'Following'].map((navItem, key) => (
      <div className={cx('nav-button-holder')}>
        <Button
          key={key}
          text={navItem}
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
  }

  renderDetails() {
    const basePath = `/${this.props.match.params.username}`;
    return (
      <div className={cx('details')}>
        {this.renderDetailNavs()}
        <Router>
          <Switch>
            <Route path="/:username/Overview" />
            <Route path="/:username/Repository" />
            <Route path="/:username/Stars" />
            <Route path="/:username/Followers" />
            <Route path="/:username/Following"/>
            <Redirect to={`${basePath}/Overview`} />
          </Switch>
        </Router>
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
