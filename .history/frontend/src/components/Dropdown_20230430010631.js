import React, { useEffect, useState } from 'react';
import './Dropdown.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
const Dropdown = ({newItems, listSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
  ]);
  useEffect(()=>{
  if (newItems !== undefined){
    setItems([...newItems, {ProfileName: 'Other', ProfileID:''}])
    handleItemClick(items)}
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
        {selectedItem ? <p className='dropdown-clickable'>Selected profile: {selectedItem}</p> : <p>Please select profile</p>}
        <span className='arrow-down'><AiOutlineArrowDown/></span>
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
    </div>
  );
};

export default Dropdown;
