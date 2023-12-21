import { useState } from "react"
import { useArtsContext } from "../hooks/useArtsContext"


const ArtForm = () => {
    const { dispatch } = useArtsContext()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('')
    
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const art = {title, price, stock, tags, description}

        const response = await fetch('/api/arts', {
            method: 'POST',
            body: JSON.stringify(art),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } 
        if (response.ok) {
            setTitle('')
            setPrice('')
            setStock('')
            setTags('')
            setDescription('')
            setError(null)
            console.log('new art added', json)
            dispatch({type: 'CREATE_ART', payload: json})
        }
    }


    return (
        <form classname="create" onSubmit={handleSubmit}>
            <h3>Add Art</h3>
            <label>Art name</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={(title)}
            />
            
            <label>Art price</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={(price)}
            />
            
            <label>Art stock</label>
            <input
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={(stock)}
            />

            <label>Art tags</label>
            <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={(tags)}
            />

            <label>Art description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={(description)}
            />

            

            <button>Add this art</button>
            {error && <div className="error" id="error">{error}</div>}
        </form>
    )
}

export default ArtForm