import React, { useEffect } from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa'
import {FiFilter} from 'react-icons/fi'
import ReactTags from 'react-tag-input';
import { useState } from 'react';
import Filter from './Filter';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from './Loading';


const SearchBar = ({ onDataSend, onSearch }) => {
    const [isVisible, setIsVisible] = useState(false);

    // keyword การ search
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isSearch, setIsSearch] = useState(false)

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
            setTimeout(() => {
                console.log(res.data)
                setServices(res.data)
                setSearchKeyword("")
                setLoading(false);
                setIsSearch(true)
            }, 2000);
        }).catch(err => {
            setTimeout(() => {
                setLoading(false);
                Swal.fire('แจ้งเตือน', err, 'error')
            }, 2000);
        })
    }

    // เมื่อมีการเปลี่ยน service หลัง search
    useEffect(() => {  
        onDataSend(services)
    },[services])

    useEffect(() => {
        onSearch(isSearch)
    },[isSearch])

    return (
        <div className='search-bar'>
            { loading && <Loading/>}
            <div className={`box-search ${isVisible ? 'visible' : ''}`}>
                <div className='frameEntry'>
                    <div className='frameEt_fill'>
                        <input className="entry-fill" type='search' placeholder="ค้นหาชื่อร้าน , แขวง หรือ เขต" value={searchKeyword} 
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
