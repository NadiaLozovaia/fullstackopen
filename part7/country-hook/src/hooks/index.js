
import { useState, useEffect } from 'react'
import axios from 'axios'

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

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    console.log(name, "name")

    useEffect(
        () => {

            const getCountry = async (name) => {
                try {
                    const response = await (axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`))
                    console.log(response)
                    setCountry(response)
                } catch (e) { console.error(e)
                    setCountry ({found:null})
                }

            }

            getCountry(name)


        }, [name]
    )


    return country
}

