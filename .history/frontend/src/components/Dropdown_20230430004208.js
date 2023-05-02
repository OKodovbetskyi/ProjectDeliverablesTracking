import React, { useEffect, useState } from 'react';
import './Dropdown.css';
const Dropdown = ({newItems, listSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
  ]);
  useEffect(()=>{
  if (newItems !== undefined){
    setItems([...newItems, {ProfileName: 'Other', ProfileID:''}])}
},[newItems]);
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.ProfileName);
    listSelect(item.ProfileID)
    setIsOpen(false);
  };

  return (
    <div className='dropdown-container'>
      <div onClick={toggleDropdown}>
        {selectedItem ? <p>Selected profile: {selectedItem}</p> : <p>Please select profile</p>}
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
