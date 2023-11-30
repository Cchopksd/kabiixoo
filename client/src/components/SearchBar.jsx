import React, { useEffect } from 'react';
import './SearchBar.css';
import "./Filter.css";
import {FaSearch} from 'react-icons/fa'
import {IoIosOptions} from 'react-icons/io'
import Select from 'react-select'
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from './Loading';
import AnimatedPage from "../AnimatedPage";


const SearchBar = ({ onDataSend, onSearch }) => {
    const [isVisible, setIsVisible] = useState(false);

    // keyword การ search
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    // state ของ filter จังหวัดทั้งหมด
    const [provinces,setProvinces] = useState({});

    // array ของ service
    const [services, setServices] = useState([])

    // load api
    const [loading, setLoading] = useState(false)

    // state ของ filter สัตว์
    const [dog, setDog] = useState(false);
    const [cat, setCat] = useState(false);
    const [bird, setBird] = useState(false);
    const [rodent, setRodent] = useState(false);
    const [reptile, setReptile] = useState(false);
    const [rabbit, setRabbit] = useState(false);

    // state ของ filter บริการเพิ่มเติม
    const [grooming, setGrooming] = useState(false);
    const [swimming, setSwimming] = useState(false);
    const [consume, setConsume] = useState(false);
    const [walk, setWalk] = useState(false);
    const [transport, setTransport] = useState(false);

    // state ของ filter มีหน้าร้าน
    const [store, setStore] = useState(false);

    // state ของ filter คะแนน เป็น sort
    const [topPoint, setTopPoint] = useState(false);
    const [lowPoint, setLowPoint] = useState(false);
    const [point, setPoint] = useState("");

    //state ของ filter ราคาเป็นช่วงราคา
    const [lowPrice, setLowPrice] = useState(false);
    const [topPrice, setTopPrice] = useState(false);
    const [fiveToTenPrice, setFiveToTenPrice] = useState(false);
    const [tenToFifteenPrice, setTenToFifteenPrice] = useState(false);
    const [fifteenToTwentyPrice, setFifteenToTwentyPrice] = useState(false);
    const [price, setPrice] = useState("");

    // state ของจังหวัด
    const [province, setProvince] = useState(null)

    // เมื่อเรียก component
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

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleSearch = async () => {
        setLoading(true)

        let chooseProvince = "";
        // เอาแค่ชื่อจังหวัด
        if (province) {
            chooseProvince = province.label
        }

        await axios.post(`${process.env.REACT_APP_API}/service`,{
            dog, cat, bird, rodent, reptile, rabbit,
            grooming, swimming, consume, walk, transport, store,
            point, price, chooseProvince, searchKeyword
        }).then((res) => {
            setTimeout(() => {
                console.log(res.data)
                setServices(res.data)
                setSearchKeyword("")
                setDog(false)
                setCat(false)
                setBird(false)
                setRodent(false)
                setReptile(false)
                setRabbit(false)
                setGrooming(false)
                setSwimming(false)
                setConsume(false)
                setWalk(false)
                setTransport(false)
                setStore(false)
                setTopPoint(false)
                setLowPoint(false)
                setPoint("")
                setLowPrice(false)
                setTopPrice(false)
                setFiveToTenPrice(false)
                setTenToFifteenPrice(false)
                setFifteenToTwentyPrice(false)
                setPrice("")
                setProvince(null)
                setIsVisible(false)
                setLoading(false);
                setIsSearch(true)
            }, 1000);
        }).catch(err => {
            setTimeout(() => {
                setSearchKeyword("")
                setDog(false)
                setCat(false)
                setBird(false)
                setRodent(false)
                setReptile(false)
                setRabbit(false)
                setGrooming(false)
                setSwimming(false)
                setConsume(false)
                setWalk(false)
                setTransport(false)
                setStore(false)
                setTopPoint(false)
                setLowPoint(false)
                setPoint("")
                setLowPrice(false)
                setTopPrice(false)
                setFiveToTenPrice(false)
                setTenToFifteenPrice(false)
                setFifteenToTwentyPrice(false)
                setPrice("")
                setProvince(null)
                setIsVisible(false)
                setLoading(false);
                Swal.fire('แจ้งเตือน', err, 'error')
            }, 1000);
        })
    }

    // เมื่อมีการเปลี่ยน service หลัง search
    useEffect(() => {  
        onDataSend(services)
    },[services])

    useEffect(() => {
        onSearch(isSearch)
    },[isSearch])

    // ล้าง filter
    const handleResetFilter = (event) => {
        event.preventDefault()
        setDog(false)
        setCat(false)
        setBird(false)
        setRodent(false)
        setReptile(false)
        setRabbit(false)
        setGrooming(false)
        setSwimming(false)
        setConsume(false)
        setWalk(false)
        setTransport(false)
        setStore(false)
        setTopPoint(false)
        setLowPoint(false)
        setPoint("")
        setLowPrice(false)
        setTopPrice(false)
        setFiveToTenPrice(false)
        setTenToFifteenPrice(false)
        setFifteenToTwentyPrice(false)
        setPrice("")
        setProvince(null)
    }

    return (
        <AnimatedPage>
            <div className='search-bar'>
                { loading && <Loading/>}
                <div className={`box-search ${isVisible ? 'visible' : ''}`}>
                    <div className='frameEntry'>
                        <div className='frameEt_fill'>
                            <input className="entry-fill" type='search' placeholder="ค้นหาชื่อร้าน แขวง หรือ เขต" value={searchKeyword} 
                            onChange={(event) => setSearchKeyword(event.target.value)}/>
                        </div>
                        <div className='fbt-filter'>
                            <button className='bt-filter' onClick={handleToggle}><IoIosOptions className='bt-filter-size'/></button>
                        </div>
                        <div className='fbt-search'>
                            <button className="bt-search" type="submit" onClick={handleSearch}> <FaSearch className='bt-search-size' size={45} color="#fff"
                            /></button>
                        </div>
                    </div>
                </div>
                <div className={isVisible ? "filter-active" : "filter-active-none"}>
                    {/* <Filter/> */}
                    <div className="container-filter">
                        <hr className='line-filter'></hr>
                        <div className="animal-checkbox">
                            <h3 className="label-filter">ประเภทสัตว์เลี้ยง</h3>
                            <ul className='items-filter'>
                                <li>
                                    <div className={`item-type ${cat && "item-type-checked"}`} role='button' onClick={() => setCat(!cat)}>
                                        <input id="pet-checkbox" type="checkbox" checked={cat} onChange={() => setCat(!cat)}/>
                                        <label className="lb-checkbox" htmlFor="cat-checkbox">แมว</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${dog && "item-type-checked"}`} role='button' onClick={() => setDog(!dog)}>
                                        <input id="pet-checkbox" type="checkbox" checked={dog} onChange={() => setDog(!dog)} />
                                        <label className="lb-checkbox" htmlFor="dog-checkbox">สุนัข</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${bird && "item-type-checked"}`} role='button' onClick={() => setBird(!bird)}>
                                        <input id="pet-checkbox" type="checkbox" checked={bird} onChange={() => setBird(!bird)} />
                                        <label className="lb-checkbox" htmlFor="bird-checkbox">นก</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${rabbit && "item-type-checked"}`} role='button' onClick={() => setRabbit(!rabbit)}>
                                        <input id="pet-checkbox" type="checkbox" checked={rabbit} onChange={() => setRabbit(!rabbit)} />
                                        <label className="lb-checkbox" htmlFor="rabbit-checkbox">กระต่าย</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${rodent && "item-type-checked"}`} role='button' onClick={() => setRodent(!rodent)}>
                                        <input id="pet-checkbox" type="checkbox" checked={rodent} onChange={() => setRodent(!rodent)} />
                                        <label className="lb-checkbox" htmlFor="rodent-checkbox">สัตว์ฟันแทะ</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${reptile && "item-type-checked"}`} role='button' onClick={() => setReptile(!reptile)}>
                                        <input id="pet-checkbox" type="checkbox" checked={reptile} onChange={() => setReptile(!reptile)} />
                                        <label className="lb-checkbox" htmlFor="reptile-checkbox">สัตว์เลื้อยคลาน</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr className='line-filter'></hr>
                        <div className="services-checkbox">
                            <h3 className="label-filter">บริการเพิ่มเติม</h3>
                            <ul className='items-filter'>
                                <li>
                                    <div className={`item-type ${grooming && "item-type-checked"}`} role='button' onClick={() => setGrooming(!grooming)}>
                                        <input id="service-checkbox" type="checkbox" checked={grooming} onChange={() => setGrooming(!grooming)} />
                                        <label className="lb-checkbox" htmlFor="grooming-checkbox">บริการกรูมมิ่ง (อาบน้ำตัดขน)</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${swimming && "item-type-checked"}`} role='button' onClick={() => setSwimming(!swimming)}>
                                        <input id="service-checkbox" type="checkbox" checked={swimming} onChange={() => setSwimming(!swimming)} />
                                        <label className="lb-checkbox" htmlFor="swimming-checkbox">สระว่ายน้ำสัตว์เลี้ยง</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${consume && "item-type-checked"}`} role='button' onClick={() => setConsume(!consume)}>
                                        <input id="service-checkbox" type="checkbox" checked={consume} onChange={() => setConsume(!consume)} />
                                        <label className="lb-checkbox" htmlFor="consume-checkbox">อาหารและของใช้เกี่ยวกับสัตว์</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${walk && "item-type-checked"}`} role='button' onClick={() => setWalk(!walk)}>
                                        <input id="service-checkbox" type="checkbox" checked={walk} onChange={() => setWalk(!walk)} />
                                        <label className="lb-checkbox" htmlFor="walk-checkbox">พาสัตว์เลี้ยงเดินเล่น</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${transport && "item-type-checked"}`} role='button' onClick={() => setTransport(!transport)}>
                                        <input id="service-checkbox" type="checkbox" checked={transport} onChange={() => setTransport(!transport)} />
                                        <label className="lb-checkbox" htmlFor="transport-checkbox">รถรับส่งสัตว์เลี้ยง</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr className='line-filter'></hr>
                        <div className="province-checkbox">
                            <h3 className="label-filter">จังหวัด</h3>
                            <ul className='items-filter'>
                                <div>
                                    <Select className="select-province" options={provinces} value={province} onChange={setProvince} placeholder="เลือกจังหวัด"/>
                                </div>
                                <div className={`item-type ${store && "item-type-checked"}`} role='button' onClick={() => setStore(!store)}>
                                    <input id="store-checkbox" type="checkbox" checked={store} onChange={() => setStore(!store)} />
                                    <label className="lb-checkbox" htmlFor="store-checkbox">มีหน้าร้าน</label>
                                </div>
                            </ul>
                        </div>
                        <hr className='line-filter'></hr>
                        <div className="score-checkbox">
                            <h3 className="label-filter">คะแนน</h3>
                            <ul className='items-filter'>
                                <li>
                                    <div className={`item-type ${topPoint && "item-type-checked"}`} role='button' onClick={() => {
                                        if (point === "topPoint"){
                                            return
                                        }
                                        else {
                                            setPoint("topPoint")
                                            setTopPoint(!topPoint)
                                            setLowPoint(false)
                                        }
                                    }}>
                                        <input id="point-checkbox" type="radio" value="topPoint" checked={point === "topPoint"} onChange={(event) => {
                                            setPoint(event.target.value)
                                            setTopPoint(!topPoint)
                                            setLowPoint(false)
                                        }}/>
                                        <label className="lb-checkbox" htmlFor="less-checkbox">คะแนนมากไปน้อย</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-type ${lowPoint && "item-type-checked"}`} role='button' onClick={() => {
                                        if (point === "lowPoint"){
                                            return
                                        }
                                        else {
                                            setPoint("lowPoint");
                                            setLowPoint(!lowPoint);
                                            setTopPoint(false);
                                        }
                                    }}>
                                        <input id="point-checkbox" type="radio" value="lowPoint" checked={point === "lowPoint"} onChange={(event) => {
                                            setPoint(event.target.value);
                                            setLowPoint(!lowPoint);
                                            setTopPoint(false);
                                        }}/>
                                        <label className="lb-checkbox" htmlFor="more -checkbox">คะแนนน้อยไปมาก</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr className='line-filter'></hr>
                        <div className="price-checkbox">
                            <h3 className="label-filter">ราคาเริ่มต้น</h3>
                            <ul className='price-filter'>
                                <li>
                                    <div className={`item-price ${lowPrice && "item-type-checked"}`} role='button' onClick={() => {
                                        if (price === "lowPrice"){
                                            return
                                        }
                                        else {
                                            setPrice("lowPrice");
                                            setLowPrice(!lowPrice)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false);
                                        }
                                    }}>
                                        <input id="price-checkbox" type="radio" value="lowPrice" checked={price === "lowPrice"} onChange={(event) => {
                                            setPrice(event.target.value);
                                            setLowPrice(!lowPrice)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false);                            }} />
                                        <label className="lb-checkbox" htmlFor="price-1-checkbox">น้อยกว่า 500 บาท</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-price ${fiveToTenPrice && "item-type-checked"}`} role='button' onClick={() => {
                                        if (price === "fiveToTenPrice"){
                                            return
                                        }
                                        else {
                                            setPrice("fiveToTenPrice");
                                            setLowPrice(false)
                                            setFiveToTenPrice(!fiveToTenPrice);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false);
                                        }
                                    }}>
                                        <input id="price-checkbox" type="radio" value="fiveToTenPrice" checked={price === "fiveToTenPrice"} onChange={(event) => {
                                            setPrice(event.target.value);
                                            setLowPrice(false)
                                            setFiveToTenPrice(!fiveToTenPrice);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false); 
                                        }} />
                                        <label className="lb-checkbox" htmlFor="price-2-checkbox">500 - 999 บาท</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-price ${tenToFifteenPrice && "item-type-checked"}`} role='button' onClick={() => {
                                        if (price === "tenToFifteenPrice"){
                                            return
                                        }
                                        else {
                                            setPrice("tenToFifteenPrice");
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(!tenToFifteenPrice);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false);
                                        }
                                    }}>
                                        <input id="price-checkbox" type="radio" value="tenToFifteenPrice" checked={price === "tenToFifteenPrice"} onChange={(event) => {
                                            setPrice(event.target.value);
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(!tenToFifteenPrice);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(false);
                                        }} />
                                        <label className="lb-checkbox" htmlFor="price-3-checkbox">1000 - 1499 บาท</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-price ${fifteenToTwentyPrice && "item-type-checked"}`} role='button' onClick={() => {
                                        if (price === "fifteenToTwentyPrice"){
                                            return
                                        }
                                        else {
                                            setPrice("fifteenToTwentyPrice");
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(!fifteenToTwentyPrice);
                                            setTopPrice(false);
                                        }
                                    }}>
                                        <input id="price-checkbox" type="radio" value="fifteenToTwentyPrice" checked={price === "fifteenToTwentyPrice"} onChange={(event) => {
                                            setPrice(event.target.value);
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(!fifteenToTwentyPrice);
                                            setTopPrice(false);
                                        }} />
                                        <label className="lb-checkbox" htmlFor="price-4-checkbox">1500 - 1999 บาท</label>
                                    </div>
                                </li>
                                <li>
                                    <div className={`item-price ${topPrice && "item-type-checked"}`} role='button' onClick={() => {
                                        if (price === "topPrice"){
                                            return
                                        }
                                        else {
                                            setPrice("topPrice");
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(!topPrice);
                                        }
                                    }}>
                                        <input id="price-checkbox" type="radio" value="topPrice" checked={price === "topPrice"} onChange={(event) => {
                                            setPrice(event.target.value);
                                            setLowPrice(false)
                                            setFiveToTenPrice(false);
                                            setTenToFifteenPrice(false);
                                            setFifteenToTwentyPrice(false);
                                            setTopPrice(!topPrice);
                                        }} />
                                        <label className="lb-checkbox" htmlFor="price-5-checkbox">มากกว่า 2500 บาท</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <hr className='line-filter'></hr>
                        <div className="function-filter">
                            <ul className='summary-filter'>
                                <li>
                                    <div>
                                        <button className="btn-resetFilter" onClick={handleResetFilter}>ล้างตัวกรองการค้นหา</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="frame-btn-searchFilter">
                                        <button className="btn-searchFilter" onClick={handleSearch}><FaSearch size={20}/></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}

export default SearchBar;
