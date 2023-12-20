import { useEffect } from "react"
import { useArtsContext } from "../hooks/useArtsContext"

//components
import ArtDetails from '../components/ArtDetails'
import ArtForm from '../components/ArtForm'

const Home = () => {
    const {arts, dispatch} = useArtsContext()

    useEffect(() => {
        const fetchArts = async () => {
            const response = await fetch('/api/arts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ARTS', payload: json})
            }
        }

        fetchArts()
    }, [dispatch])
    
    return (
        <div className="home">
            
            <div className="arts">
                {arts && arts.map((art) => (
                    <ArtDetails key={art._id} art={art}/>
                ))}
            </div>
            <ArtForm />
        </div>
    )
}

export default Home