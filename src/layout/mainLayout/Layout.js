import React from 'react'
import './Layout.css'
import Drawer from '../../components/drawer/Drawer'
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';

function Layout(props) {
    return (
        <div className='layout'>
            <div className="header">
                <div className="header__left">
                    <img src='https://spl.sabpaisa.in/clientOnBoarding/assets/img/Logo%20neew.png' alt='logo'/>
                    {/* <h1>QwikForm</h1> */}
                </div>
                <div className="header__right">
                    <h3>Logout</h3>
                </div>
            </div>
            <div className="body">
                <div className="drawer">
                    <Drawer Icon={ListAltIcon} title='Your Paylinks'/>
                    <Drawer Icon={DashboardIcon} title='Dashboard'/>
                </div>
                <div className="main__body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout
