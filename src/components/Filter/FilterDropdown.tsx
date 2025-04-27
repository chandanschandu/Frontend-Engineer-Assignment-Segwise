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

const tagCategories = [
  'CTA', 'Objects', 'Background Colour', 'CTA Placement', 'Language', 'Logo present',
  'Background setting', 'CTA background colour', 'Audio - Type', 'Audio - Language', 'Concept',
];

type Props = {
  onAddFilter: (filter: {
    type: FilterType;
    field: string;
    value: string | number;
    operator?: string;
    logicalOperator?: 'AND' | 'OR';
  }) => void;
};

export const FilterDropdown = ({ onAddFilter }: Props) => {
  const [filterType, setFilterType] = useState<FilterType>('dimension');
  const [selectedField, setSelectedField] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [operator, setOperator] = useState('>');
  const [tagOperator, setTagOperator] = useState('is');
  const [logicalOperator, setLogicalOperator] = useState<'AND' | 'OR'>('AND');

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
    if (!selectedField || inputValue.trim() === '') {
      alert('Please select a field and enter a value.');
      return;
    }

    if (filterType === 'metric') {
      onAddFilter({
        type: filterType,
        field: selectedField,
        value: Number(inputValue),
        operator,
        logicalOperator,
      });
    } else {
      onAddFilter({
        type: filterType,
        field: selectedField,
        value: inputValue,
        operator: filterType === 'tag' ? tagOperator : undefined,
        logicalOperator,
      });
    }
    
    // Reset states after adding filter
    setSelectedField('');
    setInputValue('');
    setSearchText('');
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.addFilterBar}>
        <FaPlus className={styles.plusIcon} />
        <span>Add Filter</span>
      </div>

      {/* Selected Filters */}
      <div className={styles.selectedFilters}>
        {selectedField && (
          <div className={styles.filterCard}>
            <span className={styles.filterType}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </span>
            <span className={styles.filterField}>{selectedField}</span>
            <button
              onClick={() => setSelectedField('')}
              className={styles.removeFilterBtn}
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Search and Tabs */}
      {!selectedField && (
        <>
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
        </>
      )}

      {/* Input Section for Selected Field */}
      {selectedField && (
        <div style={{ padding: '10px' }}>
          {/* Metric operators */}
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

          {/* Tag operators */}
          {filterType === 'tag' && (
            <select
              value={tagOperator}
              onChange={(e) => setTagOperator(e.target.value)}
              style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
            >
              <option value="is">Is</option>
              <option value="is not">Is Not</option>
              <option value="contains">Contains</option>
              <option value="does not contain">Does Not Contain</option>
            </select>
          )}

          {/* Input value */}
          <input
            type={filterType === 'metric' ? 'number' : 'text'}
            placeholder={filterType === 'metric' ? 'Enter number' : 'Enter value'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
          />

          {/* Apply Filter Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            Apply Filter
          </button>

          {/* Logical Operator */}
          <div style={{ marginTop: '15px' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Next Filter Condition:</label>
            <select
              value={logicalOperator}
              onChange={(e) => setLogicalOperator(e.target.value as 'AND' | 'OR')}
              style={{ padding: '8px', width: '100%' }}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
