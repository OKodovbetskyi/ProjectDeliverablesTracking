import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h3>Select an item:</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
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
        `}
      </style>
    </div>
  );
};

export default Dropdown;
