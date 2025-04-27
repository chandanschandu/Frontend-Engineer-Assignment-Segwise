import { useState } from 'react';
import styles from './Preview.module.css';

export const Preview = ({ data, onClose }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.preview} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.creative_name}</h2>
        <div className={styles.actions}>
          <button onClick={toggleExpand} className={styles.expand}>
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button onClick={onClose} className={styles.close}>×</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Creative Details</h3>
        <p><b>ID:</b> {data.creative_id}</p>
        <p><b>Tags:</b> {data.tags ? data.tags.replaceAll(';', ', ') : 'N/A'}</p>
      </div>

      <div className={styles.section}>
        <h3>Campaign Details</h3>
        <p><b>Country:</b> {data.country}</p>
        <p><b>Ad Network:</b> {data.ad_network}</p>
        <p><b>OS:</b> {data.os}</p>
        <p><b>Campaign:</b> {data.campaign}</p>
        <p><b>Ad Group:</b> {data.ad_group}</p>
      </div>

      <div className={styles.section}>
        <h3>Performance Metrics</h3>
        <p><b>IPM:</b> {Number(data.ipm).toFixed(2)}</p>
        <p><b>CTR:</b> {Number(data.ctr).toFixed(2)}%</p>
        <p><b>Spend:</b> ${Number(data.spend).toFixed(2)}</p>
        <p><b>Impressions:</b> {data.impressions}</p>
        <p><b>Clicks:</b> {data.clicks}</p>
        <p><b>CPM:</b> ${Number(data.cpm).toFixed(2)}</p>
        <p><b>Cost per Click:</b> ${Number(data.cost_per_click).toFixed(2)}</p>
        <p><b>Cost per Install:</b> ${Number(data.cost_per_install).toFixed(2)}</p>
        <p><b>Installs:</b> {data.installs}</p>
      </div>
    </div>
  );
};
