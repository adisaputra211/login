import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'medium', color = 'primary' }) {
  const containerClasses = [
    styles.spinnerContainer,
    styles[size],
    styles[color]
  ].join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
