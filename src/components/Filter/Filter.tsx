// import { useState } from 'react';
// import { FiFilter } from 'react-icons/fi';
// import { IoIosArrowDown } from 'react-icons/io';
// import styles from './Filter.module.css';
// import { FilterDropdown } from './FilterDropdown';

// type FilterType = 'dimension' | 'tag' | 'metric';

// interface FilterItem {
//   type: FilterType;
//   field: string;
//   operator?: string;
//   value: string | number;
// }

// interface FilterProps {
//   filters: FilterItem[];
//   setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
// }

// export const Filter = ({ filters, setFilters }: FilterProps) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleAddFilter = (newFilter: FilterItem) => {
//     const isDuplicate = filters.some(f => f.type === newFilter.type);
//     if (isDuplicate) {
//       alert('You can only add one filter of each type!');
//       return;
//     }
//     setFilters([...filters, newFilter]);
//     setIsDropdownOpen(false);
//   };

//   const handleRemoveFilter = (filterType: FilterType) => {
//     setFilters(filters.filter(f => f.type !== filterType));
//   };

//   return (
//     <div className={styles.filterWrapper}>
//       <button className={styles.filterButton} onClick={toggleDropdown}>
//         <FiFilter className={styles.icon} />
//         <span>Filters</span>
//         <IoIosArrowDown className={styles.arrowIcon} />
//       </button>

//       {isDropdownOpen && (
//         <div className={styles.dropdown}>
//           <FilterDropdown closeDropdown={() => setIsDropdownOpen(false)} onAddFilter={handleAddFilter} />
//         </div>
//       )}

//       <div style={{ marginTop: '20px' }}>
//         {filters.map((filter, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: '10px',
//               background: '#eee',
//               padding: '10px',
//               borderRadius: '6px',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//           >
//             <div>
//               {filter.type.toUpperCase()} — {filter.field} {filter.operator ? filter.operator : '='} {filter.value}
//             </div>
//             <button
//               onClick={() => handleRemoveFilter(filter.type)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: 'red',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//               }}
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './Filter.module.css';
import { FilterDropdown } from './FilterDropdown';

type FilterType = 'dimension' | 'tag' | 'metric';

interface FilterItem {
  type: FilterType;
  field: string;
  operator?: string;
  value: string | number;
}

interface FilterProps {
  filters: FilterItem[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

export const Filter = ({ filters, setFilters }: FilterProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddFilter = (newFilter: FilterItem) => {
    const isDuplicate = filters.some(f => f.type === newFilter.type && f.field === newFilter.field);
    if (isDuplicate) {
      alert('You can only add one filter of each type for each field!');
      return;
    }
    setFilters([...filters, newFilter]);
    setIsDropdownOpen(false);
  };

  const handleRemoveFilter = (filterType: FilterType, field: string) => {
    setFilters(filters.filter(f => f.type !== filterType || f.field !== field));
  };

  return (
    <div className={styles.filterWrapper}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
        <FiFilter className={styles.icon} />
        <span>Filters</span>
        <IoIosArrowDown className={styles.arrowIcon} />
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <FilterDropdown closeDropdown={() => setIsDropdownOpen(false)} onAddFilter={handleAddFilter} />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {filters.map((filter, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              background: '#eee',
              padding: '10px',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              {filter.type.toUpperCase()} — {filter.field} {filter.operator ? filter.operator : '='} {filter.value}
            </div>
            <button
              onClick={() => handleRemoveFilter(filter.type, filter.field)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'red',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

