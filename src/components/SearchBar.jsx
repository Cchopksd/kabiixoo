import React from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa'
import {FiFilter} from 'react-icons/fi'
import ReactTags from 'react-tag-input';


const SearchBar = () => {
    return (
        <div className='box-search'>
            <div className='frameEntry'>
                <div className='frameEt_fill'>
                    <input className="entry-fill" type='search' placeholder="ค้นหาชื่อร้าน เขต"/>
                </div>
                <div className='fbt-filter'>
                    <button className='bt-filter'><FiFilter/></button>
                </div>
                <div className='fbt-search'>
                    <button className="bt-search" type="text"> <FaSearch size={45} color="#fff"/></button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
