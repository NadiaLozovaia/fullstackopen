import axios from 'axios'
import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
        useEffect(
            () => {
    
                const getData = async (baseUrl) => {
                    try {
                        const response = await (axios.get(baseUrl))
                        console.log(response)
                        setResources(response.data)
                    } catch (e) { console.error(e)   
                    }  
                }
                getData(baseUrl)
            }, [baseUrl]
        )
    
 
    const create = async (resource) => {
        console.log(resource)
        const response = await axios.post(baseUrl, resource)
        return response.data
    }
    const service = {
        create
    }
    return [
        resources, service
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }