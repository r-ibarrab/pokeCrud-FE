import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import pokeApiService from '../services/pokeApiService'
import Alert from 'react-bootstrap/Alert';

export const Home = () => {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClick = ()=>{
    navigate("/create")
  }
  const deletePokemon = async (name,id) =>{
    const serviceResponse = await pokeApiService.deletePokemon(id)
    if(serviceResponse.error) return showAlert((await serviceResponse).data,"danger")
    showAlert(`${name} deleted succesfully`)
    await fetchData()
    
  }

  const showAlert = (msg,variant) =>{
    setAlertVariant(variant)
    setAlertMessage(msg)
    setTimeout(()=>{
      setAlertMessage("")
    },2000)
    setLoading(false)
  }

  const fetchData = async ()=>{
    const serviceResponse = await pokeApiService.getAllPokemons()
    if(serviceResponse.error) return showAlert(serviceResponse.data,"danger")
    setPokemons(serviceResponse.data) 
    setLoading(false)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
    {
      alertMessage && 
      <Alert  variant={alertVariant}>
            {alertMessage}
      </Alert>
    }
    <div className="home-container d-flex flex-column p-5">
      <div className="home-container__title d-flex justify-content-between">
        <h2>All Pokemons</h2>
        <Button className='align-self-end mb-4' onClick={handleClick}>Create</Button>
      </div>
      <ListGroup className='home-container__pokemon-list px-2'>

      {
          loading ? 
            <Spinner animation="grow" role="status">
                
            </Spinner>
          :
           (pokemons.length>0 ?
            pokemons.map(pokemon=>{
              return(
                <ListGroup.Item key={pokemon.id}>
                <div className="home-container__pokemon-list--item d-flex justify-content-between">
                  <Link to={`/${pokemon._id}`}>{pokemon.name}</Link>
                  <AiFillDelete role="button" onClick={()=>deletePokemon(pokemon.name,pokemon._id)}/>
                </div>
              </ListGroup.Item>)
            })
            :
            <p>It seems like the pokemons are hard to find :(</p>
            
            )
          
        }
     
      
      </ListGroup>
    </div>
    </>
  )
}
