import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import pokeApiService from '../services/pokeApiService';
import { useParams } from 'react-router';
import Alert from 'react-bootstrap/Alert';

export const ViewOne = ()=> {
  
  const { id } = useParams();
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name:"",
    power:"",
    isMainSeries:false
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [formAux, setFormAux] = useState({});

  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({
    name:null,
    power:null
  });


 
  const setFields = (value,field) => {
    setFormAux({
        ...formAux,
        [field]:value
    })

    const errorValue = !!!value 

    setErrors({
        ...errors,
        [field]:errorValue
    })
  }

  const handleUpdateError = (serviceError) =>{

  }

  const handleUpdate = async (e) =>{
    e.preventDefault()
    const serviceResponse = await pokeApiService.updatePokemon(id,{...formAux})
    if(serviceResponse.error) return showAlert(serviceResponse.data,'danger')
    await fetchData()
    setEdit(false)
    showAlert("Updated succesfully","success")
    
    
    
    

  }

  const showAlert = (error,variant) =>{
    setAlertVariant(variant)
    setAlertMessage(error)
    setTimeout(()=>{
      setAlertMessage("")
    },2000)
  }

  const handlePdfClick =()=>{

  }

  const fetchData = async () =>{
    const serviceResponse = await pokeApiService.getPokemonById(id)
    if(serviceResponse.error) return showAlert(serviceResponse.data,"danger")
    
    setForm(serviceResponse.data)
    setFormAux(serviceResponse.data)
    
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    if(!edit) setFormAux(form)
  },[edit])
  
 

  
  return (
    <>
        {
          alertMessage && 
          <Alert  variant={alertVariant}>
                {alertMessage}
          </Alert>
        }
      <div className='view-one'>
        <div className="view-one__title px-5 py-3 d-flex justify-content-end ">
            <Button className="mx-3" variant="secondary" href={pokeApiService.baseUrl+`pdf/${id}`} target='_blank'>
                Download PDF
            </Button>
            <Button variant={edit ? "danger" : "primary"} onClick={()=>setEdit(!edit)}>
                { edit ? "Cancel" : "Edit"}
            </Button>
        </div>
        <Form className='px-5'>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Pokemon's Name" disabled={!edit} value={formAux.name} 
            onChange={(e)=>setFields(e.target.value,"name")} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPower">
            <Form.Label>Power</Form.Label>
            <Form.Control type="text" placeholder="Enter Pokemon's Power" disabled={!edit} value={formAux.power} 
            onChange={(e)=>setFields(e.target.value,"power")} isInvalid={errors.power}/>
            <Form.Control.Feedback type="invalid">Power is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check disabled={!edit} type="checkbox" label="Is main series?" checked={formAux.isMainSeries} 
            onChange={(e)=>setFormAux({...formAux,isMainSeries:!formAux.isMainSeries})}/>
        </Form.Group>
        {
            edit && 
            <Button variant="primary" type="submit" onClick={handleUpdate}>
                Edit
            </Button>
        }
        </Form>
    </div>
    </>
    
  )
};
