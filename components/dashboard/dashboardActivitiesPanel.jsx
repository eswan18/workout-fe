import Link from 'next/link';
import styles from './dashboardActivitiesPanel.module.css';

export default function DashboardActivitiesPanel() {
    return (
        <div className={styles.panelSpace}>
            <div className={styles.panel}>
                <label className={styles.quickActionsLabel}>Quick Actions</label>
                <Link href="/workouts/live">
                    <button>Begin a Workout</button>
                </Link>
                <button disabled>Record a Past Workout</button>
                <button disabled>New Workout Type</button>
                <button disabled>New Exercise Type</button>
            </div>
        </div>
    )
}