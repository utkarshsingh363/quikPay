import React from "react";
    import { Formik, Form } from "formik";
    import * as Yup from "yup";
    import FormikControl from "../FormControl/FormControl";
import Button from '@material-ui/core/Button';
import './TestBuilderForm.css'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import config from '../../config/config'
import { Typography } from "@material-ui/core";
import toastTypes from "../../components/Toastity";


function TestBuiderForm(props) {
    const [displayAddCategoryDiv,setDisplayAddCategoryDiv]=React.useState(false)

    const toggleAddCategory=()=>{
        let showAddCategoryDiv=displayAddCategoryDiv
        setDisplayAddCategoryDiv(!showAddCategoryDiv)
    }

//********************************************************************************** */

    const [addCategoryName,setAddCategoryName]=React.useState('')

    const onSaveFormCategory=()=>{
        debugger;
        if(addCategoryName!==''){
            axios.post(`${config.backendIP}/saveFormCategory`,{
                category_name:addCategoryName,
                clientId:config.clientId
            })
            .then(res=>{
                props.getUpdatedCategoryList()
                toastTypes.successToast('New Form Category added!')
                setAddCategoryName('')
                setDisplayAddCategoryDiv(false)
                
            })
            .catch(err=>{
                toastTypes.errorToast('Something went wrong!')
                setAddCategoryName('')
                setDisplayAddCategoryDiv(false)
            })
        }else{
            toastTypes.warningToast('Please enter new Form category to be created')
        }
    }

    const getCategoryNameByLookupId=(id)=>{
        let index= props.categoryList.findIndex(cat=>cat.id===parseInt(id))
        return props.categoryList[index].value
    }

    //********************************************************************* */

    // const [selectedFields,setSelectedFields]=React.useState(props.defaultSelectedFields)   
    const [defaultSelectedFieldsList,setDefaultSelectedFieldsList]=React.useState(props.basicTemplateList)

    const[formFields,setFormFields]=React.useState(props.defaultSelectedFields)
    const [count, setCount] = React.useState(0);

    // console.log('Selected',formFields)
    // console.log('Default',defaultSelectedFieldsList)
    const toggleBasicFieldCheck=(selectedField)=>{
        // console.log('Selected Field',selectedField)
        let currentSelected=formFields
        let currentDefaultListState=props.basicTemplateList

        
        //to update the Default Field list check status
        let index1=currentDefaultListState.findIndex(item=>item.lookup_id===selectedField.lookup_id)
        currentDefaultListState[index1].selected=!selectedField.selected
        setDefaultSelectedFieldsList(currentDefaultListState)
        // console.log('Default After',defaultSelectedFieldsList)

        setCount(count+1)

        // to update the Selcted Field list
        let index2= currentSelected.findIndex(item=>item.id===selectedField.lookup_id)

        if(defaultSelectedFieldsList[index1].selected===true && index2<0){
            currentSelected.push({
                id:selectedField.lookup_id, 
                value:selectedField.lookup_name,
                lookup_subtype:selectedField.lookup_subtype,
                lookup_type:selectedField.lookup_type,
                selected:selectedField.selected
            })
        }else if(defaultSelectedFieldsList[index1].selected===false && index2>=0){
            currentSelected.splice(index2,1)
        }else{
            console.log('Do Nothing')
            // console.log('Checked Status',defaultSelectedFieldsList[index1].selected)
            // console.log('Index',index2)
            // console.log(currentSelected)
            // console.log(selectedField.lookup_id)
        }

        setFormFields(currentSelected)
        setCount(count+1)
    }

    //*****************************************************************************/
    
    const [displayMoreFieldsDiv,setDisplayMoreFieldsDiv]=React.useState(false)

    const toggleAddMoreFields=()=>{
        let showAddMoreFieldsDiv=displayMoreFieldsDiv
        setDisplayMoreFieldsDiv(!showAddMoreFieldsDiv)
    }
    
    //**************************************************************************** */

    const [dateRequired,setDateRequired]=React.useState(false)
    const dateRequiremnetOptions= [
        {key:'True',value:'true'},
        {key:'False',value:'false'}
    ];

    const [moveToSelectedFieldDump,moveToSelectedFields]=React.useState([])
    const [deselectedFieldDump,moveTODeselectDump]=React.useState([])
       
    //****************************************************************************** */
    const initialValues = {
        form_name:'',
        form_category:props.categoryList[0].id,
        date_requirement:'true',
        form_start_date:'',
        form_end_date:'',
        // select_form_fields:selectedFields
    }

    const changeDateFormat=(date)=>{
        let isoString=date.toISOString().split('T')[0]
        let newFormat=isoString.slice(8,10)+'-'+isoString.slice(5,7)+'-'+isoString.slice(0,4)

        return newFormat
    }

    const validationSchema = Yup.object({
        form_name:Yup.string().required('Required!'),
        form_category:Yup.string(),
        date_requirement:Yup.string().required('Specify if Start day and End day requirement is required'),
        form_start_date: dateRequired ? Yup.date().required('Required!'):Yup.date() ,
        form_end_date:dateRequired ? Yup.date().required('Required!'):Yup.date() ,
        select_form_fields:Yup.string()
    })
    
    const onSubmit = (values) => {

        let lookupIds=""

        if(formFields.length===0){
            toastTypes.warningToast('You need to select atleast 1 Form Field!')
        }else{
            formFields.map(field=>lookupIds+=`${field.id},`)

            const response={
                lookupIds:lookupIds.slice(0,(lookupIds.length -1)),
                mandFieldIds:"",
                formName:values.form_name,
                category_type:values['form_category'].toString(),
                clientId:`${config.clientId}`,
                paymentStartDateStr: dateRequired?changeDateFormat(values.form_start_date):"",
                paymentEndDateStr:dateRequired?changeDateFormat(values.form_end_date):"",
            }
            console.log(response)
            axios.post(`${config.backendIP}/saveFormControls`,response)
                .then(res=>{
                    let formId=res.data.response.formId
                    const link=`http://localhost:3000/getFormDetail?formId=${formId}&clientId=${config.clientId}`
                    toastTypes.successToast(`Form saved successfully. New payment link is ${link}`)
                })
                .catch(err=>{
                    toastTypes.errorToast(err)
                }) 
        }
      };    

    const handleChange = (e) => {
        let dummySelectedFields=[]

        let options = e.target.options;

        for (var i = 0, l = options.length; i < l; i++) {
            let option=options[i]
            if(option.selected===true){
                // console.log(option.getAttribute('type'))
                dummySelectedFields.push({id:parseInt(option.value),value:option.text,lookup_type:option.getAttribute('type'),selected:true})
            }
        }

        // console.log(dummySelectedFields)
        moveToSelectedFields(dummySelectedFields)
    }
   

    const handleChangetoDeselect = (e) => {
        let tobeDeselctedFields=[]

        let options = e.target.options;

        for (var i = 0, l = options.length; i < l; i++) {
            let option=options[i]
            if(option.selected===true){
                // console.log(option.getAttribute('type'))
                tobeDeselctedFields.push({id:parseInt(option.value),value:option.text,lookup_type:option.getAttribute('type'),selected:true})
            }
        }

        // console.log(tobeDeselctedFields)
        moveTODeselectDump(tobeDeselctedFields)
    }

    const moveToRight=event=>{
        event.preventDefault();
        
        let alreadySelectedFields=formFields
        let alreadySelectedFieldsIds=[]
        let defaultSelectedFieldsIds=[]

        alreadySelectedFields.map(field=>alreadySelectedFieldsIds.push(field.id))

        defaultSelectedFieldsList.map(field=>defaultSelectedFieldsIds.push(field.lookup_id))

        moveToSelectedFieldDump.map(field=>{
            let isPresent=alreadySelectedFieldsIds.includes(field.id) && defaultSelectedFieldsIds.includes(field.id)
            if(!isPresent)
                alreadySelectedFields.push(field)
            return null
        })

        setFormFields(alreadySelectedFields)
        moveToSelectedFields([])
    }

    const moveToLeft=event=>{
        event.preventDefault();

        let toRemoveFieldIds=[]
        deselectedFieldDump.map(field=>toRemoveFieldIds.push(field.id))

        let updatedSeledFields=formFields.filter(field=>!toRemoveFieldIds.includes(field.id))

        setFormFields(updatedSeledFields)
    }
    
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {formik=>(
                <Form>
                    <div className="builder__form">
                        <div className="builder__form__top">
                            <FormikControl 
                                control='input' 
                                label="Form Name"
                                name="form_name"
                                type='text'
                            />
                            <div className="builder__form-category">
                                {/* {console.log(props.categoryList)} */}
                                <FormikControl 
                                    control='select'    
                                    label="Form Category"
                                    name="form_category"
                                    options={props.categoryList}
                                    // onChange={e=>getCategoryNameByLookupId(e.target.value)}
                                />
                                <div className="builder__form-category__button">
                                <Button color="default"  variant='contained' onClick={toggleAddCategory}>
                                    <AddIcon />
                                    <strong>Create New Category</strong>
                                </Button>
                                </div>
                            </div>
                            <div className="add__form-category">
                                {displayAddCategoryDiv? 
                                    <div className="new__form-category">
                                        <input placeholder='Add Form Category' type='text' value={addCategoryName} onChange={e=>setAddCategoryName(e.target.value)}/>
                                        <Button color="primary" variant='contained' onClick={onSaveFormCategory}>
                                            <strong>Add Form Category</strong> 
                                        </Button>     
                                    </div>:
                                    null
                                }
                            </div>
                        </div>
                        <div className="builder__form__middle">
                            <h3>Basic Template for {getCategoryNameByLookupId(formik.values.form_category)}</h3>
                            {/* {console.log(props.basicTemplateList)} */}
                            <div className="active__form__template">
                                <div className="active__form__template__row">    
                                {
                                    defaultSelectedFieldsList.length===0?<p>Sorry...unable to load the Default Field List</p>:
                                    defaultSelectedFieldsList.map(field=>(
                                        <div className="active__form__template__row__item" key={field.lookup_id}>
                                            <div className="active__form__template__row__item__box">
                                                <input type="checkbox" defaultChecked key={`check_${field.lookup_id}`} onChange={()=>toggleBasicFieldCheck(field)}/>
                                                <Typography>{field.lookup_name}</Typography>
                                                {/* <FormikControl 
                                                    control={field.lookup_type==='Multiplier'? 'input':field.lookup_type.toLowerCase()}
                                                    key={field.lookup_id}
                                                    label={field.lookup_name}
                                                    name={field.lookup_name.toLowerCase()}
                                                    disabled
                                                    placeholder={field.lookup_name}
                                                    type={field.lookup_subtype==='Alpha' || field.lookup_subtype===null? 'text':field.lookup_subtype}
                                                    // options={props.categoryList}
                                                /> */}
                                            </div>
                                        </div>
                                ))}
                                </div>
                                <div className="date__requirement__div">
                                <div className="date__requirement">
                                    <FormikControl 
                                        control='radio' 
                                        label="Form Disable Date Requirement"
                                        name="date_requirement"
                                        options={dateRequiremnetOptions}
                                    />
                                    {
                                    formik.values.date_requirement==='true'?
                                    <>
                                        {setDateRequired(true)}
                                        <FormikControl 
                                            control='date' 
                                            label="Form Start Date"
                                            name="form_start_date"
                                        />

                                        <FormikControl 
                                            control='date' 
                                            label="Form End Date"
                                            name="form_end_date"
                                        />
                                    </>
                                    :
                                    setDateRequired(false)
                                    }                                    
                                </div>

                                </div>
                            </div>
                        </div>
                        <div className="builder__form__bottom__div">
                        <div className="builder__form__bottom">
                            <div className="builder__form__bottom__button">
                            <Button color="default" variant='contained'  onClick={toggleAddMoreFields}>
                                <AddIcon />
                                <strong>Add more Form Fields</strong>
                            </Button>
                            </div>
                            {
                                displayMoreFieldsDiv?
                                <>
                                    <FormikControl 
                                        control='input' 
                                        label="Form Fields keyword"
                                        name="form_field_keyword"
                                        type='text'
                                        onChange={e=>{
                                            props.getFieldListByKeyword(e.target.value)
                                        }}
                                    />
                                    {/* {console.log(props.allFields)} */}
                                    <div className='field__selection__div'>
                                        <FormikControl 
                                            control='selectMultiple' 
                                            label="Form Fields options"
                                            name="select_form_fields"
                                            
                                            options={props.allFieldsByKeyword.length===0?props.allFields:props.allFieldsByKeyword}
                                            value={props.allFields}
                                            handleChange={handleChange}
                            
                                        />
                                        <div className="arrow__buttons">
                                            <button onClick={moveToRight} style={{fontSize:'larger'}}>&#8680;</button>
                                            <button onClick={moveToLeft} style={{fontSize:'larger'}}>&#8678;</button>
                                        </div>
                                        <FormikControl 
                                            control='selectMultiple' 
                                            label="Selected Form Fields"
                                            name="select_form_fields"
                                            // options={selectedFields}
                                            // value={selectedFields}
                                            options={formFields}
                                            value={formFields}
                                            handleChange={handleChangetoDeselect}
                                        />
                                    </div>
                                </>
                                :
                                null
                            } 
    
                        </div>

                        </div>
                    </div>
                    <div className="submit__form">
                        <Button type="submit" color="primary" variant='contained'>
                            <strong>Submit</strong>
                        </Button>
                    </div>
                </Form>
            )}
            
        </Formik>
        
    )
}

export default TestBuiderForm
