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

    const [provinces,setProvinces] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json')
        .then(res => res.json())
        .then(data => {
            const provinceNames = data.map(province => ({
                value: province.id,
                label: province.name_th,
            }));
            setProvinces(provinceNames);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div className='home'>
            <div className='xtf'>
                <h1 className='text-find'>ค้นหาผู้ให้บริการ<br/>ที่ตรงตามความต้องการของคุณได้เลย</h1>
            </div>
            <SearchBar/>
            <Filter/>
        </div>
    );
};

export default Home;