import React from 'react';
import './Header.css';
import logo from './pictures/logo.svg';
import settings from './pictures/settings.png';
import profile from './pictures/profile.png';

/** Header provides a space at the top and to show profile and settings icons. Split into left, center and right divs for logo title and settings icons */

class Header extends React.Component {


    render() {
        return (
            <div className="Header">
                <div className='HeaderLeft'>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className='HeaderCenter'>
                    <h1>CDR Billing</h1>
                </div>
                <div className='HeaderRight'>
                    <p><img src={profile} className="profileicon" alt="logo" title="profile" /> <img src={settings} className="settingsicon" alt="logo" title="settings" /></p>
                </div>
            </div>
        )
    }
}

export default Header;