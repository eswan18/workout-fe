import styles from './liveWorkout.module.css'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

function SetPanel({name, reps, duration}) {
    const text = reps ? `${reps} reps` : `${duration} seconds`
    return (
        <div className={styles.setPanel}>
            <label className={styles.exerciseNameLabel}>{name}</label>
            <p>{text}</p>
        </div>
    )
}

function getWorkoutTypes({accessToken, onSuccess, onError}) {

    const config = {headers: {Authorization: `Bearer ${accessToken}`}}
    axios
        .get(`${API_URL}/workout_types`, config)
        .then(function(response) {
            onSuccess(response)
        })
        .catch(function(error) {
            onError(error)
        })
}

export default function LiveWorkout() {
    const { data: session } = useSession()
    const accessToken = session.accessToken

    const [sets, setSets] = useState([])
    const [workoutTypes, setWorkoutTypes] = useState([])
    // We need this wacky function to avoid mutating via array.Push.
    // Really makes me regret naming a data entity "set".
    const addSet = (newSet) => setSets([...sets, newSet])
    // Pull needed info from the API on initial load.
    useEffect(() => {
        const onSuccess = (response) => {
            setWorkoutTypes(response.data)
        }
        getWorkoutTypes({accessToken, onSuccess, onError: console.log})
    }, [])
    return (
        <div className={styles.liveWorkout}>
            <select>
                {workoutTypes.map(({id, notes, name}, i) => <option value={id} key={i} title={notes}>{name}</option>)}
            </select>
            {sets.map((set, i) => <SetPanel name={set.name} reps={set.reps} key={i}/>)}
            <button onClick={() => addSet({name: "abc", reps: 5})}>Click me to add a fake set</button>
        </div>
    )
}