import styles from './dashboard.module.css';
import DashboardActivitiesPanel from './dashboardActivitiesPanel'
import DashboardRecentWorkouts from './dashboardRecentWorkouts'

export default function Dashboard({token}) {
    return (
      <div className={styles.dashboard}>
        <h3>here is a token... I hope</h3>
        {token}
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