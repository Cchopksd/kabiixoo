import React from "react";
import "./Filter.css";
import SearchBar from "./SearchBar.jsx";
import { useState, useEffect } from "react";
import Select from 'react-select'
import {FaSearch} from 'react-icons/fa'

const Filter = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [id]: checked,
        }));
    };

    const [provinces,setProvinces] = useState({});

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
        <form className="container-filter">
            <hr className='line-filter'></hr>
            <div className="animal-checkbox">
                <h3 className="label-filter">ประเภทสัตว์เลี้ยง</h3>
                <ul className='items-filter'>
                    <li>
                        <div className={`item-type ${checkedItems["cat-checkbox"] ? "checked" : ""}`}>
                            <input id="cat-checkbox" type="checkbox" value="cat" />
                            <label className="lb-checkbox" htmlFor="cat-checkbox" onChange={handleCheckboxChange}>แมว</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="dog-checkbox" type="checkbox" value="dog" />
                            <label className="lb-checkbox" htmlFor="dog-checkbox">สุนัข</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="bird-checkbox" type="checkbox" value="bird" />
                            <label className="lb-checkbox" htmlFor="bird-checkbox">นก</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="rabbit-checkbox" type="checkbox" value="rabbit" />
                            <label className="lb-checkbox" htmlFor="rabbit-checkbox">กระต่าย</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="rodent-checkbox" type="checkbox" value="rodent" />
                            <label className="lb-checkbox" htmlFor="rodent-checkbox">สัตว์ฟันแทะ</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="reptile-checkbox" type="checkbox" value="reptile" />
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
                        <div className="item-type">
                            <input id="grooming-checkbox" type="checkbox" value="grooming" />
                            <label className="lb-checkbox" htmlFor="grooming-checkbox" onChange={handleCheckboxChange}>บริการกรูมมิ่ง (อาบน้ำตัดขน)</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="swimming-checkbox" type="checkbox" value="swimming" />
                            <label className="lb-checkbox" htmlFor="swimming-checkbox">สระว่ายน้ำสัตว์เลี้ยง</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="consume-checkbox" type="checkbox" value="consume" />
                            <label className="lb-checkbox" htmlFor="consume-checkbox">อาหารและของใช้เกี่ยวกับสัตว์</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="walk-checkbox" type="checkbox" value="walk" />
                            <label className="lb-checkbox" htmlFor="walk-checkbox">พาสัตว์เลี้ยงเดินเล่น</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="transport-checkbox" type="checkbox" value="transport" />
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
                        <Select className="select-province" options={provinces}/>
                    </div>
                    <div className="item-type">
                        <input id="store-checkbox" type="checkbox" value="store" />
                        <label className="lb-checkbox" htmlFor="store-checkbox">มีหน้าร้าน</label>
                    </div>

                </ul>
            </div>
            <hr className='line-filter'></hr>
            <div className="score-checkbox">
                <h3 className="label-filter">คะแนน</h3>
                <ul className='items-filter'>
                    <li>
                        <div className="item-type">
                            <input id="less-checkbox" type="checkbox" value="less" />
                            <label className="lb-checkbox" htmlFor="less-checkbox" onChange={handleCheckboxChange}>คะแนนน้อยไปมาก</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-type">
                            <input id="more -checkbox" type="checkbox" value="more" />
                            <label className="lb-checkbox" htmlFor="more -checkbox">คะแนนมากไปน้อย</label>
                        </div>
                    </li>
                </ul>
            </div>
            <hr className='line-filter'></hr>
            <div className="price-checkbox">
                <h3 className="label-filter">ราคาเริ่มต้น</h3>
                <ul className='price-filter'>
                    <li>
                        <button className="item-price">
                            <input id="price-1-checkbox" type="checkbox" value="price-1" />
                            <label className="lb-checkbox" htmlFor="price-1-checkbox" onChange={handleCheckboxChange}> &lt; 500 บาท</label>
                        </button>
                    </li>
                    <li>
                        <div className="item-price">
                            <input id="price-2-checkbox" type="checkbox" value="price-2" />
                            <label className="lb-checkbox" htmlFor="price-2-checkbox">500 - 1000 บาท</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-price">
                            <input id="price-3-checkbox" type="checkbox" value="price-3" />
                            <label className="lb-checkbox" htmlFor="price-3-checkbox">1000 - 1500 บาท</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-price">
                            <input id="price-4-checkbox" type="checkbox" value="price-4" />
                            <label className="lb-checkbox" htmlFor="price-4-checkbox">1500 - 2000 บาท</label>
                        </div>
                    </li>
                    <li>
                        <div className="item-price">
                            <input id="price-5-checkbox" type="checkbox" value="price-5" />
                            <label className="lb-checkbox" htmlFor="price-5-checkbox">&gt; 2500 บาท</label>
                        </div>
                    </li>
                </ul>
            </div>
            <hr className='line-filter'></hr>
            <div className="function-filter">
                <ul className='summary-filter'>
                    <li>
                        <div>
                            <input className="btn-resetFilter" type="reset" />
                        </div>
                    </li>
                    <li>
                        <div className="frame-btn-searchFilter">
                            <button className="btn-searchFilter" type="submit"><FaSearch size={20}/></button>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    );
}

export default Filter;
