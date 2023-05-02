import React, { useEffect, useState } from 'react';

const Dropdown = ({newItems}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]);
  useEffect(()=>{
  if (newItems !==undefined){
    setItems(newItems)}
},[newItems]);
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        {selectedItem ? selectedItem : <p>Please select profile</p>}
      </div>
      {isOpen && (
        <ul>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className={selectedItem === item ? 'selected' : 'deopdown-item'}
            >
              {item.ProfileName}
            </li>
          ))}
        </ul>
      )}
      <style>
        {`
          ul {
            list-style: none;
            padding: 0;
          }
          .deopdown-item {
            padding-left: 10px;
            cursor: pointer;
           
          }
          li:hover {
            text-indent: 10px;
            background-color: #ccc;
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
