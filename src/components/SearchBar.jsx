import React from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa'
import {FiFilter} from 'react-icons/fi'
import ReactTags from 'react-tag-input';
import { useState } from 'react';
import Filter from './Filter';


const SearchBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className='search-bar'>
            <div className={`box-search ${isVisible ? 'visible' : ''}`}>
                <div className='frameEntry'>
                    <div className='frameEt_fill'>
                        <input className="entry-fill" type='search' placeholder="ค้นหาชื่อร้าน เขต"/>
                    </div>
                    <div className='fbt-filter'>
                        <button className='bt-filter' onClick={handleToggle}><FiFilter/></button>
                    </div>
                    <div className='fbt-search'>
                        <button className="bt-search" type="submit"> <FaSearch size={45} color="#fff"/></button>
                    </div>
                </div>
            </div>
            <div className={isVisible ? "filter-active" : "filter-active-none"}>
                <Filter/>
                {/* {isVisible && (
                    <Filter/>
                )} */}
            </div>
        </div>
    );
}

export default SearchBar;
