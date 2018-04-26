import React, { Component, Fragment } from 'react';
import classnames from 'classnames/bind';
import Dialog from '../components/dialog';
import Button from '../components/button';
import Styles from './navbar.css';

const cx = classnames.bind(Styles);

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldDisplayModal: false
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

  onSearchEnter = e => {
    if (e.which === 13 && this.searchInput.value.length) {
      this.openModal();
    }
  }

  onLeaveSearchFocus = () => {
    this.searchInput.value = '';
  }

  render() {
    return (
      <Fragment>
        <div className={cx('navbar-container')}>
          <div className={cx('flex')}>
            <div className={cx('hub-icon')} onClick={() => {window.open("https://github.com", "_blank")}} />
            <input
              className={cx('search-box')}
              type="text"
              onBlur={this.onLeaveSearchFocus}
              onKeyPress={this.onSearchEnter}
              ref={searchInput => {
                this.searchInput = searchInput;
              }}
              placeholder="Search ..."
            />
            {['Pull requests', 'Issues', 'Marketplace', 'Explore'].map((buttonText, key) => (
              <Button
                key={key}
                text={buttonText}
                onClick={this.openModal}
                classNames={cx('navbar-button-container')}
                buttonClassName={cx('navbar-button')}
              />
            ))}
          </div>
          <div className={cx('account-settings')} onClick={this.openModal}>
            <div className={cx('avatar', 'avatar-icon')} />
            <div className={cx('down-arrow')} />
          </div>
        </div>
        {this.state.shouldDisplayModal && <Dialog onClose={this.closeModal} />}
      </Fragment>
    )
  }
}

export default Navbar;
