import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormControl";
import Button from '@material-ui/core/Button';
import './BuilderForm.css'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import config from '../../config/config'

function BuiderForm(props) {
    const [addCategoryDiv,setAddCategoryDiv]=React.useState(false)
    const [addMoreFieldsDiv,setAddMoreFieldsDiv]=React.useState(false)
    const [addCategoryName,setAddCategoryName]=React.useState('')
    const [selectedFields,setSelectedFields]=React.useState([])
    const [dateRequired,setDateRequired]=React.useState(true)

    const [selectedFormFields,setSelectedFormFields]=React.useState([])

    const [basicFieldList, updateBasicFieldList]=React.useState(props.basicFormListwithCheck)

    const [checked, setChecked]=React.useState(true)
    // const [formFieldkeyword,setFormFieldKeyword]=React.useState('')

    const toggleAddCategory=()=>{
        let showAddCategoryDiv=addCategoryDiv
        setAddCategoryDiv(!showAddCategoryDiv)
    }
    const toggleAddMoreFields=()=>{
        let showAddMoreFieldsDiv=addMoreFieldsDiv
        setAddMoreFieldsDiv(!showAddMoreFieldsDiv)
    }
    
    const toggleBasicFieldCheck=(id)=>{
        
        const currentCheckStatus=basicFieldList.filter(item=>item.lookup_id===id)[0].checked
        
        const index=basicFieldList.findIndex(item=>item.lookup_id===id)
        
        const updatedCheckStatus=!currentCheckStatus
        
        let updatedList=basicFieldList
        updatedList[index].checked=updatedCheckStatus
        // console.log(basicFieldList)
        updateBasicFieldList(updatedList)

        let checkedFields=[]
        basicFieldList.filter(field=>field.checked===true).map(field=>
            checkedFields.push({id:field.lookup_id, value:field.lookup_name})
            )
        setSelectedFormFields(checkedFields)
    }

    const onSaveFormCategory=()=>{
        if(addCategoryName!==''){
            axios.post(`${config.backendIP}/saveFormCategory`,{
                category_name:addCategoryName,
                clientId:config.clientId
            })
            .then(res=>{
                props.getUpdatedCategoryList()
                alert('New Form Category added!')
                setAddCategoryName('')
                setAddCategoryDiv(false)
                
            })
            .catch(err=>{
                alert('Something went wrong!')
                setAddCategoryName('')
                setAddCategoryDiv(false)
            })
        }else{
            alert('Please enter new Form category to be created')
        }
    }
 
    const dateRequiremnetOptions= [
        {key:'True',value:'true'},
        {key:'False',value:'false'}
    ];

    let catList=[]
    props.categoryList.map(category=>
        catList.push({id:category.category_id, value:category.category_name})
    )

    let fieldList=[]
    props.allFields.map(field=>
        fieldList.push({id:field.lookup_id, value:field.lookup_name})
    )

    let fieldListByKeyword=[]
    props.allFieldsByKeyword.map(field=>
        fieldListByKeyword.push({id:field.lookup_id, value:field.lookup_name})
    )

    // let checkedFields=[]
    // basicFieldList.filter(field=>field.checked===true).map(field=>
    //     checkedFields.push({id:field.lookup_id, value:field.lookup_name})
    //     )
    // setSelectedFormFields(checkedFields)
    

    const initialValues = {
        form_name:'',
        form_category:catList[0].value,
        date_requirement:'true',
        form_start_date:'',
        form_end_date:'',
        // select_form_fields:selectedFields
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
        values['select_form_fields']= selectedFields
        console.log("Form data", values);
        alert('New Form created successfully!')
        window.location.reload()
      };

    const handleChange = (e) => {
        let options = e.target.options;
        // let selectedField={id:e.target.value, value:e.target.lastChild.text}
        // console.log(e.target.lastChild.text)
        // let updatedSelectedFields=selectedFields
        // console.log(updatedSelectedFields)
        // updatedSelectedFields.push(selectedField)
        

        let value = [];
        let updatedSelectedFields=[...selectedFields]
       
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                // value.push(options[i].value);
                updatedSelectedFields.push({id:options[i].value, value:options[i].text})
            }
        }
        // console.log(value)
        console.log(updatedSelectedFields)
        setSelectedFormFields(updatedSelectedFields)
        // setSelectedFields(value)
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
                                <FormikControl 
                                    control='select' 
                                    label="Form Category"
                                    name="form_category"
                                    options={catList}
                                />
                                <Button color="primary" onClick={toggleAddCategory}>
                                    <AddIcon />
                                    Add Category
                                </Button>
                            </div>
                            <div className="add__form-category">
                                {addCategoryDiv? 
                                    <div className="new__form-category">
                                        <input placeholder='Add Form Category' type='text' value={addCategoryName} onChange={e=>setAddCategoryName(e.target.value)}/>
                                        <Button color="primary" variant='contained' onClick={onSaveFormCategory}>
                                            Add Form Category
                                        </Button>     
                                    </div>:
                                    null
                                }
                            </div>
                        </div>
                        <div className="builder__form__middle">
                            <h3>Basic Template for {formik.values.form_category}</h3>
                            <div className="active__form__template">
                                {/* {console.log(basicFieldList)} */}
                                {basicFieldList.map(field=>(
                                    <div style={{display:'flex', alignItems:'center'}} key={field.lookup_id}>
                                        <input type="checkbox" defaultChecked key={`check_${field.lookup_id}`} selected={true} onChange={id=>toggleBasicFieldCheck(field.lookup_id)}/>
                                        <FormikControl 
                                            control={field.lookup_type==='Multiplier'? 'input':field.lookup_type.toLowerCase()}
                                            key={field.lookup_id}
                                            label={field.lookup_name}
                                            name={field.lookup_name.toLowerCase()}
                                            disabled
                                            placeholder={field.lookup_name}
                                            type={field.lookup_subtype==='Alpha'? 'text':field.lookup_subtype}
                                            // options={props.categoryList}
                                        />
                                    </div>
                                ))}
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
                        <div className="builder__form__bottom">
                            <Button color="primary"  onClick={toggleAddMoreFields}>
                                <AddIcon />
                                Add More Controls
                            </Button>
                            {
                                addMoreFieldsDiv?
                                <>
                                    <FormikControl 
                                        control='input' 
                                        label="Form Fields keyword"
                                        name="form_field_keyword"
                                        type='text'
                                        onChange={e=>{
                                            // console.log(e.target.value)
                                            props.getFieldListByKeyword(e.target.value)
                                        }}
                                        // options={fieldList}
                                        // value={fieldList}
                                        // handleChange={handleChange}
                                    />
                                    <div className='field__selection__div'>
                                        <FormikControl 
                                            control='selectMultiple' 
                                            label="Form Fields options"
                                            name="select_form_fields"
                                            
                                            options={fieldListByKeyword.length===0?fieldList:fieldListByKeyword}
                                            value={fieldList}
                                            handleChange={handleChange}
                            
                                        />

                                        <FormikControl 
                                            control='selectMultiple' 
                                            label="Selected Form Fields"
                                            name="select_form_fields"
                                            
                                            options={selectedFormFields}
                                            value={selectedFormFields}
                                            // handleChange={handleChange}
                                            
                                        />
                                    </div>


                                    {/* <FormikControl 
                                    control='selectMultiple' 
                                    label="Select Form Fields"
                                    name="select_form_fields"
                                    options={fieldList}
                                    value={fieldList}
                                    handleChange={handleChange}
                                    
                                    />*/}
                                </>
                                :
                                null
                            } 
    
                        </div>
                    </div>
                    <div className="submit__form">
                        <Button type="submit" color="primary" variant='contained'>
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default BuiderForm
