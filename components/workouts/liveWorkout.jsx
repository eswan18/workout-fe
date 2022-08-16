import styles from './liveWorkout.module.css'
import { useState } from "react"

function SetPanel({name, reps, duration}) {
    const text = reps ? `${reps} reps` : `${duration} seconds`
    return (
        <div className={styles.setPanel}>
            <label className={styles.exerciseNameLabel}>{name}</label>
            <p>{text}</p>
        </div>
    )
}

export default function LiveWorkout() {
    const [sets, setSets] = useState([])
    // We need this wacky function to avoid mutating via array.Push.
    // Really makes me regret naming a data entity "set".
    const addSet = (newSet) => setSets([...sets, newSet])
    return (
        <div className={styles.liveWorkout}>
            {sets.map((set, i) => <SetPanel name={set.name} reps={set.reps} key={i}/>)}
            <button onClick={() => addSet({name: "abc", reps: 5})}>Click me to add a fake set</button>
        </div>
    )
}