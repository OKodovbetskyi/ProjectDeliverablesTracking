import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setItems((prevItems) => prevItems.filter((i) => i !== item));
    setItems((prevItems) => [item, ...prevItems]);
  };

  return (
    <div>
      <h3>Select an item:</h3>
      <ul>
        {items.map((item) => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      <style>
        {`
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            padding-left: 10px;
            cursor: pointer;
          }
          li:hover {
            text-indent: 10px;
          }
          li.selected {
            background-color: #ccc;
          }
          li.hidden {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Dropdown;
