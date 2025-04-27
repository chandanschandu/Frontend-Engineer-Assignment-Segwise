import styles from './Preview.module.css';

export const Preview = ({ data, onClose }: any) => {
  return (
    <div className={styles.preview}>
      <button onClick={onClose} className={styles.close}>X</button>
      <h3>{data.creative_name}</h3>
      <p><b>ID:</b> {data.creative_id}</p>
      <p><b>Tags:</b> {data.tags ? data.tags.replaceAll(';', ', ') : ''}</p>
      <p><b>Spend:</b> ${data.spend}</p>
    </div>
  );
};
