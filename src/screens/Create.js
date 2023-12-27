import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import pokeApiService from '../services/pokeApiService';
import Alert from 'react-bootstrap/Alert';

export const Create = ()=> {
  
  const navigate = useNavigate()

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [form, setForm] = useState({
    name:"",
    power:"",
    isMainSeries:false
  });
  const [errors, setErrors] = useState({
    name:false,
    power:false
  });

  const setFields = (value,field) => {
    
    setForm({
        ...form,
        [field]:value
    })

    if(!!!value){
      setErrors({
        ...errors,
        [field]:true
    })
   }else{
    setErrors({
      ...errors,
      [field]:false
  })
   }
   

  }

  const validateForm = () =>{
    const nameError = form.name.length < 3
    const powerError = form.power.length < 3

    setErrors({
      name:nameError,
      power:powerError
    })

    return !(nameError || powerError)
  }

  const showAlert = (msg,variant) => {
    setAlertVariant(variant)
    setAlertMessage(msg)
    setTimeout(()=>{
      setAlertMessage("")
      navigate("/")
    },1000)
  }

  const handleClick = async (e) =>{
    e.preventDefault()

    if(!validateForm()) return

    
    const serviceResponse = await pokeApiService.createPokemon({...form})
    if(serviceResponse.error) return showAlert(serviceResponse.data,"danger")
    showAlert("Created successfully","success")
    
  }
  
  return (
    <Form className='p-5' noValidate validated={false}>
        {
          alertMessage && 
          <Alert  variant={alertVariant}>
                {alertMessage}
          </Alert>
        }
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter Pokemon's Name" value={form.name} 
        onChange={(e)=>setFields(e.target.value,"name")} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">Name should be at least 3 characters long</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPower">
        <Form.Label>Power</Form.Label>
        <Form.Control required type="text" placeholder="Enter Pokemon's Power" value={form.power} 
        onChange={(e)=>setFields(e.target.value,"power")} isInvalid={errors.power}/>
        <Form.Control.Feedback type="invalid">Power should be at least 3 characters long</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Is main series?" checked={form.isMainSeries} 
        onChange={(e)=>setForm({...form,isMainSeries:!form.isMainSeries})}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Create
      </Button>
    </Form>
  )
};
