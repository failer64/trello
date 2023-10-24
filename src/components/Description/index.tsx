import img from '../../assets/images/arrow.svg'
import styles from './Description.module.scss'


const Description = () => {
	return (
		<div className={styles.body}>
			<h1 className={styles.title}>
				<img src={img} alt="Task List" width={'36px'} />
				<span>Task List</span>
			</h1>
			<p className={styles.item}>Use this template to track your personal tasks.</p>
			<p className={styles.item}>Click <span>+ New</span> to create a new task directly on this board.</p>
			<p className={styles.item}>Click an existing task to add additional context or subtasks.</p>
		</div>
	)
}

export default Description