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

function AddSetPanel({exercises, selectedExercise, setSelectedExerciseById}) {
    const content = selectedExercise ? <p>{selectedExercise.name}: {selectedExercise.notes}</p> : null
    return (
        <div className={styles.setPanel}>
            <label className={styles.exerciseNameLabel}>New Set</label>
            <ExerciseChooser setSelectedExerciseById={setSelectedExerciseById} exercises={exercises}/>
            {content}
        </div>
    )
}

function WorkoutTypeChooser({workoutTypes}) {
    const dynamicOptions = workoutTypes.map(({id, notes, name}, i) => <option value={id} key={i} title={notes}>{name}</option>)
    return (
        <select>
            <option value="">Choose a workout type</option>
            {dynamicOptions}
        </select>
    )
}

function ExerciseChooser({exercises, setSelectedExerciseById}) {
    const dynamicOptions = exercises.map(({id, notes, name}, i) => <option value={id} key={i} title={notes}>{name}</option>)
    return (
        <select onChange={(event) => setSelectedExerciseById(event.target.value)}>
            <option value="">Choose an exercise type</option>
            {dynamicOptions}
        </select>
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

function getExercises({accessToken, onSuccess, onError}) {
    const config = {headers: {Authorization: `Bearer ${accessToken}`}}
    axios
        .get(`${API_URL}/exercises`, config)
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
    const [exercises, setExercises] = useState([])
    const [selectedExercise, setSelectedExercise] = useState(undefined)

    // We need this wacky function to avoid mutating via array.Push.
    // Really makes me regret naming a data entity "set".
    const addSet = (newSet) => setSets([...sets, newSet])
    const setSelectedExerciseById = (id) => setSelectedExercise(exercises.find((ex) => ex.id === id))

    // Pull needed info from the API on initial load.
    useEffect(() => {
        getWorkoutTypes({
            accessToken,
            onSuccess: (res) => setWorkoutTypes(res.data),
            onError: console.log
        })
        getExercises({
            accessToken,
            onSuccess: (res) => setExercises(res.data),
            onError: console.log
        })
    }, [])
    return (
        <div className={styles.liveWorkout}>
            <WorkoutTypeChooser workoutTypes={workoutTypes}/>
            {sets.map((set, i) => <SetPanel name={set.name} reps={set.reps} key={i}/>)}
            <button onClick={() => addSet({name: "abc", reps: 5})}>Click me to add a fake set</button>
            <AddSetPanel exercises={exercises} selectedExercise={selectedExercise} setSelectedExerciseById={setSelectedExerciseById}/>
        </div>
    )
}