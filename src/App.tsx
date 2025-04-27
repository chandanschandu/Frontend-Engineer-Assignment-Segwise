

import { useState, useMemo } from 'react';
import { mockData } from './data/mockData';
import { Filter } from './components/Filter/Filter';
import { Table } from './components/Table/Table';
import { Preview } from './components/Preview/Preview';
import styles from './App.module.css';

type FilterType = 'dimension' | 'tag' | 'metric';

interface FilterItem {
  type: FilterType;
  field: string;
  value: string | number;
  operator?: string;
}

function App() {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const applyFilters = (data: any[]) => {
    let filtered = [...data];

    filters.forEach(filter => {
      if (filter.type === 'dimension') {
        filtered = filtered.filter(item => item[filter.field] === filter.value);
      } else if (filter.type === 'tag') {
        filtered = filtered.filter(item => item.tags?.includes(`${filter.field}:${filter.value}`));
      } else if (filter.type === 'metric') {
        if (filter.operator === '>') {
          filtered = filtered.filter(item => Number(item[filter.field]) > Number(filter.value));
        } else if (filter.operator === '<') {
          filtered = filtered.filter(item => Number(item[filter.field]) < Number(filter.value));
        } else {
          filtered = filtered.filter(item => Number(item[filter.field]) === Number(filter.value));
        }
      }
    });

    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        Object.values(item).some(val => val?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredData = useMemo(() => applyFilters(mockData), [filters, searchQuery]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>🟩</div>
        <div>
          <h1>Segwise</h1>
         
        </div>
      </header>

      <div className={styles.filterSection}>
  <Filter filters={filters} setFilters={setFilters} />
</div>


      <div className={styles.instructions}>
        <b>Search  </b>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tableSection}>
        <Table data={filteredData} onRowClick={setSelectedRow} />
      </div>

      {selectedRow && (
        <Preview data={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </div>
  );
}

export default App;
