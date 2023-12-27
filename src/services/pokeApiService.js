
const baseUrl = "http://127.0.0.1:3001/api/pokemon/"

const getAllPokemons = async () =>{
    let error = false
    let data = ""
    try{
        const response = await fetch(baseUrl)
        data = await response.json()
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
    
}

const getPokemonById = async (id) =>{
    let error = false
    let data = ""
    try{
        const response = await fetch(baseUrl+`${id}`)
        data = await response.json()
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
}

const createPokemon = async (bodyData) =>{
    let error = false
    let data = ""
    try{
        const response = await fetch(baseUrl,{
            method:"POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body:JSON.stringify(bodyData)
        })
        data = await response.json()
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
}

const updatePokemon = async (id,bodyData) =>{
    let error = false
    let data = ""
    try{
        const response = await fetch(baseUrl+`${id}`,{
            method:"PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body:JSON.stringify(bodyData)
        })
        data = await response.json()
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
}

const deletePokemon = async (id) =>{
    let error = false
    let data = ""
    try{
        const response = await fetch(baseUrl+`${id}`,{
            method:"DELETE",
        })
        data = await response.json()
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
}

export default {
    deletePokemon,
    createPokemon,
    updatePokemon,
    getAllPokemons,
    getPokemonById,
    baseUrl
}