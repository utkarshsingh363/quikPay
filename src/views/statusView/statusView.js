import React from 'react'
import './statusView.css'
import Paper from '@material-ui/core/Paper';
import config from '../../config/config'

function StatusView() {
    return (
        <div className='status__box'>
            <Paper elevation={1}>
                <div className="receipt">
                    <div className="receipt__top">
                        <h1>Transaction Summary</h1>
                    </div>
                    <div className="receipt__main">

                        {Object.keys(config.receiptDummy).map((field,index)=>
                        <span key={`field_${index}`} style={index%2===0?{backgroundColor:'lightgray'}:{backgroundColor:'white'}} className="receipt__row">
                            <span className="receipt__field">
                                {field} :
                            </span>
                            <span className="receipt__field__value">
                                {config.receiptDummy[field]}
                            </span>
                        </span>
                        )}
                    </div>
                    <div className="receipt__bottom">

                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default StatusView
