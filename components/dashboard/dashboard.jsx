import { useSession } from 'next-auth/react';
import styles from './dashboard.module.css';
import DashboardActivitiesPanel from './dashboardActivitiesPanel'
import DashboardRecentWorkouts from './dashboardRecentWorkouts'

function hitApi() {
  const endpoint = '/api/passthrough/workout_types/abc?c=3'
  console.log('hitting endpoint')
  fetch(endpoint)
}

export default function Dashboard() {
  hitApi()
    return (
      <div className={styles.dashboard}>
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