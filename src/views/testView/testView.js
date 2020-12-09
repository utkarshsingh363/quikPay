import React,{useEffect} from 'react'
import './testView.css'
import Paper from '@material-ui/core/Paper';
// import FormContainer from '../../components/FormContainer/FormContainer'
import TestBuilderForm from '../../components/TestBuilderForm/TestBuilderForm'
import axios from 'axios'
import config from '../../config/config'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';


function TestFormBuilder(props) {
    // const [loading,setLoader]=React.useState(true)
    const [categoryList,setCategoryList]=React.useState([])

    const getUpdatedCategoryList=()=>{
        axios.get(`${config.backendIP}/getFormCategoryList?clientId=${config.clientId}`)
        .then(res=>{
            let categoryListReqFormat=[]
            JSON.parse(res.data.response).map(category=>
                categoryListReqFormat.push({id:category.category_id, value:category.category_name})
            )
            setCategoryList(categoryListReqFormat)
            // setLoader(false)
        })
        .catch(err=>{
            console.log(err)
            // setLoader(false)
            setCategoryList([])
        })    
    }

    useEffect(() => {
        getUpdatedCategoryList()  
      },[]);

//*************************************************************************** */

const [basicTemplateList,setBasicTemplateList]=React.useState([])
const [defaultSelectedFields,setDefaultSelectedFields]=React.useState([])


useEffect(() => {
    async function fetchData() {
        try{
            const res= await axios.get(`${config.backendIP}/formBuilder`)
            // console.log(data.data.response)
            let apiBasicTemplate=JSON.parse(res.data.response)
            let selectedFields=[]

            apiBasicTemplate.map(field=>
                field['selected']=true
            )

            apiBasicTemplate.map(field=>
                selectedFields.push(
                    {
                        id:field.lookup_id, 
                        value:field.lookup_name,
                        lookup_subtype:field.lookup_subtype,
                        lookup_type:field.lookup_type,
                        selected:field.selected
                    })
            )   
            setBasicTemplateList(apiBasicTemplate)
            setDefaultSelectedFields(selectedFields)
        }catch(err){
            console.log(err)
            setBasicTemplateList([])
            setDefaultSelectedFields([])
        }
    }
    fetchData(); 
         
    },[]);

//************************************************************ */    
    const [allFields,setAllFields]=React.useState([])

    useEffect(() => {
        axios.get(`${config.backendIP}/getAllFormFieldList`)
        .then(res=>{
            let fieldList=[]
            JSON.parse(res.data.response).map(field=>
                fieldList.push({id:field.lookup_id, value:field.lookup_name,type:field.lookup_type, subtype:field.lookup_subtype})
            )
            setAllFields(fieldList)
            // setLoader(false)
        })
        .catch(err=>{
            console.log(err)
            setAllFields([])
        })       
        },[]);

//*************************************************************************** */
    const [allFieldsByKeyword,setAllFieldsByKeyword]=React.useState(allFields)
    
    const getFieldListByKeyword=(keyword)=>{
        axios.get(`${config.backendIP}/getFormFieldListByFieldName?fieldName=${keyword}`)
        .then(res=>{
            let fieldListByKeyword=[]
            JSON.parse(res.data.response).map(field=>
                fieldListByKeyword.push({id:field.lookup_id, value:field.lookup_name, type:field.lookup_type, subtype:field.lookup_subtype})
            )
            setAllFieldsByKeyword(fieldListByKeyword)
        })
        .catch(err=>{
            console.log(err)
            setAllFieldsByKeyword([])
        })     
        	
    }

    //*************************************************************************** */
    const history=useHistory();
    const goBack =(e)=>{
        e.preventDefault()
        history.goBack()
    }

    // const [count, setCount] = React.useState(0);

    //***************************************************************************** */
    return (
        <div className='form__builder'>
            {/* <div className="form__builder__header">
                <h2>Form Builder</h2>
            </div> */}
    
                  <div className="form__builder__form">
                    {(categoryList.length===0 || basicTemplateList.length===0 || allFields.length===0 || defaultSelectedFields.length===0)?
                        <CircularProgress />
                        :
                        <div className='form__div'>
                            <div className='form__div__top'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ArrowBackIcon />}
                                    onClick={goBack}
                                >
                                    <strong>Back</strong>
                                </Button>
                            </div>
                            <div className="form__div__head">
                                <strong>Create New Paylink</strong>
                            </div>
                            <Paper elevation={1}>
                                <TestBuilderForm categoryList={categoryList} 
                                    basicTemplateList={basicTemplateList}
                                    defaultSelectedFields={defaultSelectedFields}
                                    allFields={allFields} 
                                    allFieldsByKeyword={allFieldsByKeyword} 
                                    getUpdatedCategoryList={getUpdatedCategoryList} 
                                    getFieldListByKeyword={(id)=>getFieldListByKeyword(id)}
                                />
                            </Paper>
                        </div>
                    }
              </div>
        </div>
    )
}

export default TestFormBuilder
