import { useState } from 'react';
import styles from './Table.module.css';

export const Table = ({ data, onRowClick }: any) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    if (sortDirection === 'asc') {
      return (a[sortColumn] || '').toString().localeCompare((b[sortColumn] || '').toString());
    } else {
      return (b[sortColumn] || '').toString().localeCompare((a[sortColumn] || '').toString());
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('creative_id')}>Creative ID</th>
            <th onClick={() => handleSort('creative_name')}>Name</th>
            <th>Tags</th>
            <th onClick={() => handleSort('country')}>Country</th>
            <th onClick={() => handleSort('spend')}>Spend</th>
          </tr>
        </thead>
        <tbody>
          {currentData
            .filter((row: any) => row && row.creative_id)
            .map((row: any) => (
              <tr key={row.creative_id} onClick={() => onRowClick(row)}>
                <td>{row.creative_id}</td>
                <td>{row.creative_name}</td>
                <td>{row.tags ? row.tags.replaceAll(';', ', ') : ''}</td>
                <td>{row.country}</td>
                <td>${row.spend}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
