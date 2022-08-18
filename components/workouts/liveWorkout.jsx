import styles from './liveWorkout.module.css'
import { useEffect, useState } from "react"
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

function getWorkoutTypes() {
    const token = "nonsense todo"
    axios
        .get(`${API_URL}/workout_types`, {headers: {'Authorization': 'basic '+ token}})
        .then(function(response) {
            console.debug(response)
        })
        .catch(function(error) {
            console.debug(error)
        })
}

export default function LiveWorkout() {
    const [sets, setSets] = useState([])
    const [workoutTypes, setWorkoutTypes] = useState([])
    // We need this wacky function to avoid mutating via array.Push.
    // Really makes me regret naming a data entity "set".
    const addSet = (newSet) => setSets([...sets, newSet])
    // Pull needed info from the API on initial load.
    useEffect(() => {
        getWorkoutTypes()
        setWorkoutTypes(['abc'])
    }, [])
    return (
        <div className={styles.liveWorkout}>
            <ul>
                {workoutTypes.map((wt, i) => <li key={i}>{wt}</li>)}
            </ul>
            {sets.map((set, i) => <SetPanel name={set.name} reps={set.reps} key={i}/>)}
            <button onClick={() => addSet({name: "abc", reps: 5})}>Click me to add a fake set</button>
        </div>
    )
}