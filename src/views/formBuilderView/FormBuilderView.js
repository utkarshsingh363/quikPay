import React,{useEffect} from 'react'
import './FormBuilderView.css'
import Paper from '@material-ui/core/Paper';
// import FormContainer from '../../components/FormContainer/FormContainer'
import BuilderForm from '../../components/BuilderForm/BuiderForm'
import axios from 'axios'
import config from '../../config/config'
import CircularProgress from '@material-ui/core/CircularProgress';


function FormBuilder() {
    const [categoryList,setCategoryList]=React.useState([])
    const [allFields,setAllFields]=React.useState([])
    const [allFieldsByKeyword,setAllFieldsByKeyword]=React.useState(allFields)
    const [loading,setLoader]=React.useState(true)
    const [basicTemplateList,setBasicTemplateList]=React.useState([])

    useEffect(() => {
        axios.get(`${config.backendIP}/getFormCategoryList?clientId=${config.clientId}`)
        .then(res=>{
            setCategoryList(JSON.parse(res.data.response))
            setLoader(false)
        })
        .catch(err=>{
            console.log(err)
            setLoader(false)
            setCategoryList([])
        })       
      },[]);


    useEffect(() => {
    axios.get(`${config.backendIP}/formBuilder`)
    .then(res=>{
        setBasicTemplateList(JSON.parse(res.data.response))
    })
    .catch(err=>{
        console.log(err)
        setBasicTemplateList([])
    })       
    },[]);

    useEffect(() => {
        axios.get(`${config.backendIP}/getAllFormFieldList`)
        .then(res=>{
            setAllFields(JSON.parse(res.data.response))
        })
        .catch(err=>{
            console.log(err)
            setAllFields([])
        })       
        },[]);


    const getFieldListByKeyword=(keyword)=>{
        axios.get(`${config.backendIP}/getFormFieldListByFieldName?fieldName=${keyword}`)
        .then(res=>{
            setAllFieldsByKeyword(JSON.parse(res.data.response))
        })
        .catch(err=>{
            console.log(err)
            setAllFieldsByKeyword([])
        })     
        	
    }

    const getUpdatedCategoryList=()=>{
        axios.get(`${config.backendIP}/getFormCategoryList?clientId=${config.clientId}`)
        .then(res=>{
            setCategoryList(JSON.parse(res.data.response))
            setLoader(false)
        })
        .catch(err=>{
            console.log(err)
            setLoader(false)
            setCategoryList([])
        })    
    }
      
    let basicFormListwithCheck=basicTemplateList.map(item=> {
        item.checked=true
        return item
        })

    return (
        <div className='form__builder'>
            {/* <div className="form__builder__header">
                <h2>Form Builder</h2>
            </div> */}
            <div className="form__builder__form">
                {loading?<CircularProgress />:
                    <Paper elevation={1}>
                        <BuilderForm categoryList={categoryList} 
                            basicTemplateList={basicTemplateList}
                            basicFormListwithCheck={basicFormListwithCheck} 
                            allFields={allFields} 
                            allFieldsByKeyword={allFieldsByKeyword} 
                            getUpdatedCategoryList={getUpdatedCategoryList} 
                            getFieldListByKeyword={(id)=>getFieldListByKeyword(id)}/>
                    </Paper>
                }
                {/* <Paper elevation={1}>
                    <FormContainer />
                    {loading? <CircularProgress />:
                    <BuilderForm categoryList={categoryList} basicTemplateList={basicTemplateList} allFields={allFields} allFieldsByKeyword={allFieldsByKeyword} getFieldListByKeyword={(id)=>getFieldListByKeyword(id)}/>
                    }
                </Paper> */}
            </div>
        </div>
    )
}

export default FormBuilder
