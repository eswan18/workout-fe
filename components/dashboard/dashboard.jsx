import styles from './dashboard.module.css';
import DashboardActivitiesPanel from './dashboardActivitiesPanel'
import DashboardRecentWorkouts from './dashboardRecentWorkouts'

export default function Dashboard() {
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