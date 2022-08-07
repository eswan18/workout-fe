import styles from './dashboard.module.css';
import DashboardRecentWorkouts from './dashboardRecentWorkouts'

export default function Dashboard() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.halfFlex}>
          <DashboardRecentWorkouts/>
        </div>
        <div className={styles.halfFlex}>
          <DashboardRecentWorkouts/>
        </div>
      </div>
    )
}