import React from 'react'
import './paylinkFormLayout.css'

function PaylinkFormLayout(props) {
    return (
        <div className="fullForm__layout">
            <div className='fullForm__content'>
                <div className="merchant__header">
                    <div className="merchant__header__logo">
                        <img  alt='Merchant Logo'/>
                        <p>MERCHANT NAME</p>
                    </div>

                    <div className="header__contactUs">
                        <h5>For any Queries, contact us on:<br/>sabpaisa@srslive.in | 01141733223</h5>
                    </div>
                </div>

                <div className="SP__logo">
                    <img src='https://paylink.sabpaisa.in/PayLink/images/sabpaisa-logo.png' alt='logo'/>
                </div>
                <div className="fullForm__body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default PaylinkFormLayout
