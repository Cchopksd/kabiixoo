import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarAdmin from './SideBarAdmin'

const SingleReport = (props) => {

    const params = useParams();
    const [report, setReport] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/report/${(params.slug)}`)
        .then(response=>{
            setReport(response.data);
        }).catch(err => alert(err));
    }, [params.slug])

    return (
        <div>
            <SideBarAdmin />
            <h1>Hello World</h1>
            {JSON.stringify(report)}
        </div>
    );
}

export default SingleReport;
