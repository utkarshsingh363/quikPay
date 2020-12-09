import React from 'react'
import './TestFormViewer.css'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormControl";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import config from '../../config/config'
import toastTypes from "../../components/Toastity";

function TestFormViewer(props) {
    // console.log(props.formData)
    const formStructure= props.formData.formStructure
    const orderedFormStructure=[]

    formStructure.map(formData=>{
        let index=formData.fieldOrder
        // console.log()
        orderedFormStructure[index]=formData.formField
        return null
    })

    const initialValues = {}
    const validationObject={}

    // console.log(orderedFormStructure)
    orderedFormStructure.map((field,index)=>{
        initialValues[`${field.lookup_id}~${field.lookup_name}~${index}`]=''
        // initialValues[field.lookup_name.toLowerCase().replaceAll(' ','_')]=''
        validationObject[`${field.lookup_id}~${field.lookup_name}~${index}`]=Yup.string().required('Required!')
        // validationObject[field.lookup_name.toLowerCase().replaceAll(' ','_')]=Yup.string().required('Required!')
        return '' 
    })

    // const validationSchema = Yup.object(validationObject)
    const validationSchema = props.disablePayNow?Yup.object({}):Yup.object(validationObject)

    const onSubmit = (values) => {
        let res=''
        let response
        // console.log(Object.keys(values))
        Object.keys(values).map(field=>{
            let fieldSplit=field.split('~')
            // console.log(fieldSplit)
            res+=`${fieldSplit[0]}~${fieldSplit[1]}=${values[field]}$${fieldSplit[2]},`
            response=res.slice(0,(res.length -1))
            return ''
        })

        console.log(`${config.backendIP}/formProcessForPayment?values=${response}&formid=${props.formId}&cid=${config.clientId}&bid=0&payeeProfile=${props.formData.categoryName}&viewName=api`)
        axios.get(`${config.backendIP}/formProcessForPayment?values=${response}&formid=${props.formId}&cid=${config.clientId}&bid=0&payeeProfile=${props.formData.categoryName}&viewName=api`)
            .then(res=>{
                console.log(res)
                toastTypes.successToast('Data Saved Successfully')
            })  
            .then(err=>{
                console.log(err)
                toastTypes.errorToast('Something went wrong')
            })
      };
    return (
        <div className='form__viewer'>
            <div className="form__viewer__top">
                <p>{props.formData.formName}</p>
            </div>
            {/* <div className="form__viewer__bottom">
                <div className="form__viewer__bottom__enclose"> */}
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {formik=>(
                            <div className="form__viewer__form">        
                            <Form>
                                {orderedFormStructure.map((field,index)=>
                                <div className="form__viewer__bottom">
                                <div className="form__viewer__bottom__enclose">
                                <FormikControl 
                                    control='input' 
                                    // control={field.lookup_type==='Multiplier'? 'input':field.lookup_type.toLowerCase()}
                                    label={field.lookup_name}
                                    name={`${field.lookup_id}~${field.lookup_name}~${index}`}
                                    type='text'
                                    key={field.lookup_id}
                                    />
                                    </div>
                                    </div>
                                )}
                                {
                                    props.disablePayNow?
                                    null
                                    :
                                    <div className="form__viewer__form__button">
                                        <Button type="submit" color="primary" variant='contained'>
                                            Pay Now
                                        </Button>
                                    </div>
                                }

                            </Form>
                        </div>
                        )
                        }
                    </Formik>

                {/* </div>
            </div> */}
        </div>
    )
}

export default TestFormViewer
