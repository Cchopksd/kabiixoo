import React, { useEffect } from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa'
import {FiFilter} from 'react-icons/fi'
import ReactTags from 'react-tag-input';
import { useState } from 'react';
import Filter from './Filter';
import Swal from 'sweetalert2';
import axios from 'axios';


const SearchBar = ({ onDataSend }) => {
    const [isVisible, setIsVisible] = useState(false);

    // keyword การ search
    const [searchKeyword, setSearchKeyword] = useState("")

    // array ของ service
    const [services, setServices] = useState([])

    // load api
    const [loading, setLoading] = useState(false)

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleSearch = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_API}/service?search=${searchKeyword}`).then((res) => {
            console.log(res.data)
            setServices(res.data)
            setLoading(false);
        }).catch(err => {
            Swal.fire('แจ้งเตือน', err, 'error')
        })
    }

    // เมื่อมีการเปลี่ยน service หลัง search
    useEffect(() => {  
        onDataSend(services)
    },[services])

    return (
        <div className='search-bar'>
            <div className={`box-search ${isVisible ? 'visible' : ''}`}>
                <div className='frameEntry'>
                    <div className='frameEt_fill'>
                        <input className="entry-fill" type='search' placeholder="ค้นหาชื่อร้าน , แขวง" value={searchKeyword} 
                        onChange={(event) => setSearchKeyword(event.target.value)}/>
                    </div>
                    <div className='fbt-filter'>
                        <button className='bt-filter' onClick={handleToggle}><FiFilter className='bt-filter-size'/></button>
                    </div>
                    <div className='fbt-search'>
                        <button className="bt-search" type="submit"> <FaSearch className='bt-search-size' size={45} color="#fff"
                        onClick={handleSearch}/></button>
                    </div>
                </div>
            </div>
            <div className={isVisible ? "filter-active" : "filter-active-none"}>
                <Filter/>
            </div>
        </div>
    );
}

export default SearchBar;
