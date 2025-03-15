import React, { useState } from 'react';
import './SortingGuide.css';
import { sortingItems } from '../data/sortingGuideItems';

const SortingGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'recyclable', name: 'Recyclable' },
    { id: 'compost', name: 'Compost' },
    { id: 'landfill', name: 'Landfill' },
    { id: 'special', name: 'Special Disposal' }
  ];

  const filteredItems = sortingItems
    .filter(item => 
      (activeCategory === 'all' || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="sorting-guide">
      <h1 className="section-title">Waste Sorting Guide</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items (e.g., plastic bottle, coffee cup)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="categories-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={`sorting-item ${item.category}`}>
              <div className="item-icon">
                <img src={`/icons/${item.icon}`} alt={item.name} />
              </div>
              <div className="item-content">
                <h3>{item.name}</h3>
                <div className={`item-category ${item.category}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
                <p>{item.instructions}</p>
                {item.tips && <p className="item-tips"><strong>Tip:</strong> {item.tips}</p>}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No matching items found. Try a different search term.</p>
          </div>
        )}
      </div>
      
      <div className="sorting-guide-footer">
        <h3>Sorting Guidelines</h3>
        <div className="guidelines">
          <div className="guideline">
            <h4>Recyclable</h4>
            <p>Clean and dry items that can be processed and made into new products.</p>
          </div>
          <div className="guideline">
            <h4>Compost</h4>
            <p>Organic materials that break down naturally and enrich soil.</p>
          </div>
          <div className="guideline">
            <h4>Landfill</h4>
            <p>Items that cannot currently be recycled or composted.</p>
          </div>
          <div className="guideline">
            <h4>Special Disposal</h4>
            <p>Items that require special handling due to hazardous components.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingGuide;
