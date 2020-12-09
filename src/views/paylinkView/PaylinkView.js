import React,{useEffect} from 'react'
import './PaylinkView.css'
import queryString from 'query-string'
import axios from 'axios'
import config from '../../config/config'
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TestFormViewer from '../../components/TestFormViewer/TestFormViewer'
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

function PaylinkView(props) {
    const [loading,setLoader]=React.useState(true)
    const [formData,setFormData]=React.useState({})
    const [formID,setFormID]=React.useState(null)

    useEffect(() => {
        setLoader(true)
        const params=queryString.parse(props.location.search)
        const formId=params.formId
        setFormID(formId)
        const clientId=params.clientId

        axios.get(`${config.backendIP}/getFormDetailForPayment?formId=${formId}&clientId=${clientId}`)
            .then(res=>{
                // console.log(res.data.response)
                setFormData(res.data.response)
                setLoader(false)
            })
            .catch(err=>{
                console.log(err)    
            })

      },[props.location.search]);

      const history=useHistory();
      const goBack=()=>{
          history.goBack()
      }

    return (
        <div className='paylink__view'>
            {props.disablePayNow?
                // <button onClick={goBack}>Go Back</button>
                <div className="paylink__view__top">
                    <Button color="primary" variant='contained'  onClick={goBack}>
                        <ArrowBackIcon />
                        <strong className='view__button'>Back</strong>
                    </Button>
                </div>
                :null}
      
            <div className="paylink__view__form">
                {loading?<CircularProgress />:
                <Paper elevation={1}>
                    <TestFormViewer formData={formData} disablePayNow={props.disablePayNow} formId={formID}/>
                </Paper>}
            </div>
        </div>
    )
}

export default PaylinkView
