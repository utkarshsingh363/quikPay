import React from 'react'
import './Drawer.css'

function Drawer({Icon, title}) {
    return (
        <div className="drawer__row">
            {Icon && <Icon />}
            <h4>{title}</h4>
        </div>
    )
}

export default Drawer
