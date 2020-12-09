import React from 'react'
import './processingTransactionView.css'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";
import { withRouter } from "react-browser-router";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));


function ProcessingTransactionView() {
    const classes = useStyles();
    return (
        <div className>            
            <Backdrop className={classes.backdrop} open={true}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Typography variant="h3" style={{marginBottom:'20px'}}>Processing...</Typography>
                    <CircularProgress />
                </div>
            </Backdrop>
        </div>
    )
}

export default withRouter(ProcessingTransactionView)
