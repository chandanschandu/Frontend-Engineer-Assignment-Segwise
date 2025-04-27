// import { useState } from 'react';
// import styles from './FilterDropdown.module.css';
// import { FaPlus } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';

// type FilterType = 'dimension' | 'tag' | 'metric';

// const dimensionOptions = [
//   'creative_id', 'creative_name', 'country', 'ad_network', 'os', 'campaign', 'ad_group',
// ];

// const tagCategories = [
//   'Character', 'Background', 'Elements', 'CTA Position', 'CTA Text',
// ];

// const metricOptions = [
//   'ipm', 'ctr', 'spend', 'impressions', 'clicks', 'cpm', 'cost_per_click', 'cost_per_install', 'installs',
// ];

// type Props = {
//   closeDropdown: () => void;
//   onAddFilter: (filter: {
//     type: FilterType;
//     field: string;
//     value: string | number;
//     operator?: string;
//   }) => void;
// };

// export const FilterDropdown = ({ closeDropdown, onAddFilter }: Props) => {
//   const [filterType, setFilterType] = useState<FilterType>('dimension');
//   const [selectedField, setSelectedField] = useState<string>('');
//   const [searchText, setSearchText] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const [operator, setOperator] = useState('>');

//   const getOptions = () => {
//     if (filterType === 'dimension') return dimensionOptions;
//     if (filterType === 'tag') return tagCategories;
//     return metricOptions;
//   };

//   const filteredOptions = getOptions().filter((opt) =>
//     opt.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const handleFieldSelect = (field: string) => {
//     setSelectedField(field);
//   };

//   const handleSubmit = () => {
//     if (!selectedField || inputValue === '') {
//       alert('Please select a field and enter a value.');
//       return;
//     }

//     if (filterType === 'metric') {
//       onAddFilter({
//         type: filterType,
//         field: selectedField,
//         value: Number(inputValue),
//         operator,
//       });
//     } else {
//       onAddFilter({
//         type: filterType,
//         field: selectedField,
//         value: inputValue,
//       });
//     }
//   };

//   return (
//     <div className={styles.dropdownContainer}>
//       <div className={styles.addFilterBar}>
//         <FaPlus className={styles.plusIcon} />
//         <span>Add Filter</span>
//       </div>

//       <div className={styles.searchWrapper}>
//         <FiSearch className={styles.searchIcon} />
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className={styles.searchInput}
//         />
//       </div>

//       <div className={styles.tabs}>
//         <div
//           className={`${styles.tab} ${filterType === 'dimension' ? styles.activeTab : ''}`}
//           onClick={() => { setFilterType('dimension'); setSelectedField(''); }}
//         >
//           Dimensions
//         </div>
//         <div
//           className={`${styles.tab} ${filterType === 'tag' ? styles.activeTab : ''}`}
//           onClick={() => { setFilterType('tag'); setSelectedField(''); }}
//         >
//           Tags
//         </div>
//         <div
//           className={`${styles.tab} ${filterType === 'metric' ? styles.activeTab : ''}`}
//           onClick={() => { setFilterType('metric'); setSelectedField(''); }}
//         >
//           Metrics
//         </div>
//       </div>

//       <div className={styles.optionsList}>
//         {filteredOptions.map((opt) => (
//           <div
//             key={opt}
//             className={`${styles.optionItem} ${selectedField === opt ? styles.selectedItem : ''}`}
//             onClick={() => handleFieldSelect(opt)}
//           >
//             {opt}
//           </div>
//         ))}
//       </div>

//       {selectedField && (
//         <div style={{ padding: '10px' }}>
//           {filterType === 'metric' && (
//             <select
//               value={operator}
//               onChange={(e) => setOperator(e.target.value)}
//               style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
//             >
//               <option value=">">Greater than</option>
//               <option value="<">Less than</option>
//               <option value="=">Equal to</option>
//             </select>
//           )}
//           <input
//             type={filterType === 'metric' ? 'number' : 'text'}
//             placeholder={filterType === 'metric' ? 'Enter number' : 'Enter value'}
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             style={{ width: '90%', padding: '10px' }}
//           />
//           <button
//             onClick={handleSubmit}
//             style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px' }}
//           >
//             Apply Filter
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
import { useState } from 'react';
import styles from './FilterDropdown.module.css';
import { FaPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

type FilterType = 'dimension' | 'tag' | 'metric';

const dimensionOptions = [
  'creative_id', 'creative_name', 'country', 'ad_network', 'os', 'campaign', 'ad_group',
];

const metricOptions = [
  'ipm', 'ctr', 'spend', 'impressions', 'clicks', 'cpm', 'cost_per_click', 'cost_per_install', 'installs',
];

// Predefined tags categories (Objects, Background Colours, etc.)
const tagCategories = [
  'End card elements - CTA',
  'End card elements - Objects',
  'End card elements - Background Colour',
  'End card elements - CTA Placement',
  'End card elements - Language',
  'End card elements - Logo present',
  'End card elements - Background setting',
  'End card elements - CTA background colour',
  'Audio - Type',
  'Audio - Language',
  'Concept',
];

type Props = {
  closeDropdown: () => void;
  onAddFilter: (filter: {
    type: FilterType;
    field: string;
    value: string | number;
    operator?: string;
  }) => void;
};

export const FilterDropdown = ({ closeDropdown, onAddFilter }: Props) => {
  const [filterType, setFilterType] = useState<FilterType>('dimension');
  const [selectedField, setSelectedField] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [operator, setOperator] = useState('>');

  const getOptions = () => {
    if (filterType === 'dimension') return dimensionOptions;
    if (filterType === 'tag') return tagCategories;
    return metricOptions;
  };

  const filteredOptions = getOptions().filter((opt) =>
    opt.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
  };

  const handleSubmit = () => {
    if (!selectedField || inputValue === '') {
      alert('Please select a field and enter a value.');
      return;
    }

    if (filterType === 'metric') {
      onAddFilter({
        type: filterType,
        field: selectedField,
        value: Number(inputValue),
        operator,
      });
    } else {
      onAddFilter({
        type: filterType,
        field: selectedField,
        value: inputValue,
      });
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.addFilterBar}>
        <FaPlus className={styles.plusIcon} />
        <span>Add Filter</span>
      </div>

      <div className={styles.searchWrapper}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${filterType === 'dimension' ? styles.activeTab : ''}`}
          onClick={() => { setFilterType('dimension'); setSelectedField(''); }}
        >
          Dimensions
        </div>
        <div
          className={`${styles.tab} ${filterType === 'tag' ? styles.activeTab : ''}`}
          onClick={() => { setFilterType('tag'); setSelectedField(''); }}
        >
          Tags
        </div>
        <div
          className={`${styles.tab} ${filterType === 'metric' ? styles.activeTab : ''}`}
          onClick={() => { setFilterType('metric'); setSelectedField(''); }}
        >
          Metrics
        </div>
      </div>

      <div className={styles.optionsList}>
        {filteredOptions.map((opt) => (
          <div
            key={opt}
            className={`${styles.optionItem} ${selectedField === opt ? styles.selectedItem : ''}`}
            onClick={() => handleFieldSelect(opt)}
          >
            {opt}
          </div>
        ))}
      </div>

      {selectedField && (
        <div style={{ padding: '10px' }}>
          {filterType === 'metric' && (
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
            >
              <option value=">">Greater than</option>
              <option value="<">Less than</option>
              <option value="=">Equal to</option>
            </select>
          )}
          <input
            type={filterType === 'metric' ? 'number' : 'text'}
            placeholder={filterType === 'metric' ? 'Enter number' : 'Enter value'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '90%', padding: '10px' }}
          />
          <button
            onClick={handleSubmit}
            style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px' }}
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};
