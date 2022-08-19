import styles from './dashboard.module.css';
import DashboardActivitiesPanel from './dashboardActivitiesPanel'
import DashboardRecentWorkouts from './dashboardRecentWorkouts'
import { useSession } from "next-auth/react"
import { inspect } from 'util'

export default function Dashboard() {
  const session = useSession()
    return (
      <div className={styles.dashboard}>
        <h3>here is the current session... I hope</h3>
        {inspect(session)}
        <DashboardActivitiesPanel/>
        <div className={styles.flex}>
          <div className={styles.halfFlex}>
            <DashboardRecentWorkouts/>
          </div>
          <div className={styles.halfFlex}>
            <DashboardRecentWorkouts/>
          </div>
        </div>
      </div>
    )
}