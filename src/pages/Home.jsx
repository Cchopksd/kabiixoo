import React from 'react';
import Select from 'react-select';
import { useEffect,useState} from 'react';
import {FaSearch} from 'react-icons/fa'
import '../pages/Home.css'
// import background from '../images/bg_dog.png';

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
            <div className='box-search opacity-60'>
                <div className='frameEntry'>
                    <div className='frameEt_fill'>
                        <input className="entry-fill" type='text' placeholder="ค้นหาชื่อร้าน,เขต"/>
                    </div>
                    <div className='fbt-search'>
                        <button className="bt-search" type="button"> <FaSearch size={50} color="#fff"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;