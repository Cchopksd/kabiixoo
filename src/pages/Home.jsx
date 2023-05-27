import React from 'react';
import Select from 'react-select';
import { useEffect,useState} from 'react';
import {FaSearch} from 'react-icons/fa'
import SearchBar from '../components/SearchBar';
import '../pages/Home.css'
import Filter from '../components/Filter';

const Home = () => {

    useEffect(() => {
        document.body.classList.add('home-page');
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    return (
        <div className='home'>
            <div className='xtf'>
                <h1 className='text-find'>ค้นหาผู้ให้บริการ<br/>ที่ตรงตามความต้องการของคุณได้เลย</h1>
            </div>
            <SearchBar/>
        </div>
    );
};

export default Home;