import React from 'react'
import './BlankLayout.css'

function BlankLayout(props) {
    return (
        <div className="blank__layout">
            {props.children}
        </div>
    )
}

export default BlankLayout
