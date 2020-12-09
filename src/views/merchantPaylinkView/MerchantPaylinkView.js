import React,{useEffect} from 'react'
import './MerchantPaylinkView.css'
import { useHistory } from "react-router";
import {  Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import config from '../../config/config'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import toastTypes from "../../components/Toastity";

function MerchantPaylinkView() {
    const [loading,setLoader]=React.useState(true)
    const [clientPaylinks,setClientPaylink]=React.useState([])

    const history=useHistory();

    useEffect(() => {
        axios.get(`${config.backendIP}/getPayLinksByClientId?clientId=${config.clientId}`)
            .then(res=>{
                setClientPaylink(JSON.parse(res.data.response))
                setLoader(false)
            })
            .catch(err=>{
                toastTypes.errorToast(err)
                console.log(err)
                setLoader(false)
            })
        
      },[]);

    const createNew=(e)=>{
        e.preventDefault()
        history.push('/createPaylink')
        
    }   

    const showFormTemplate=(formId,clientId)=>{
        history.push(`/getFormDetail/adminView?formId=${formId}&clientId=${clientId}`)
    }

    return (
        <div className='merchant__paylink__view'>
            <div className="merchant__paylink__view__top">
                {/* <h1>Your Paylinks</h1> */}
                <Button color="primary"  variant='contained' onClick={createNew}>
                    <strong>Create New</strong>
                </Button>
            </div>

            <div className="merchant__paylinks">
                <div className="merchant__paylinks__top">
                    <strong>List of Paylinks</strong>
                </div>
                { loading?<CircularProgress />:
                    <Paper elevation={1}>
                        <div className="merchant__paylinks__row">
                        {clientPaylinks.map(link=>
                            <div key={link.formId} className='merchant__paylinks__row__item'>
                                <strong>{link.formName}</strong>
                                <Button color="default" variant='contained'  onClick={()=>showFormTemplate(link.formId,link.clientId)}>
                                    <OpenInNewIcon/>
                                    <strong className='view__button'>View</strong>
                                </Button>
                            </div>
                        )}
                        </div>
                    </Paper>
                }

            </div>
        </div>
    )
}

export default MerchantPaylinkView
