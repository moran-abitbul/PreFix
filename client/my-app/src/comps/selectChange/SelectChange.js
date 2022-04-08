import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function SelectChange() {

    useEffect(() => {
        makeGetRequest();
    }, []);

    const [data, setData] = useState(null);

    async function makeGetRequest() {
        let res = await axios.get('//localhost:8000/selectChange')
        let dataFromServer = res.data.massage;
        console.log(res.data.massage)

        setData(dataFromServer);
    }

    // const makeGetRequest = () => {
    //     return axios
    //         .get('//localhost:8000/selectChange')
    //         .then(res => {
    //             console.log(res.data.name)
    //             setData({ text: res.data.name })
    //         })
    //         .catch((err) => console.error(err));
    // };


    return (
        <div className="selectChange">
            <h1>Please select your Changes</h1>

            {/* print slide of presentation */}

            <div>{data}</div>

            <h4>בחר את השינויים שברצונך להחיל את המצגת</h4>
            <br />
            <br />
            <br />

            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Font" />
                <FormControlLabel control={<Switch defaultChecked />} label="Font Color" />
                <FormControlLabel control={<Switch defaultChecked />} label="Background Color" />
                <FormControlLabel control={<Switch defaultChecked />} label="Video" />
                <FormControlLabel control={<Switch defaultChecked />} label="Pictures" />
            </FormGroup>

            <Link to="/showChange">
                <button>Lets Start Baby !!</button>
            </Link>
        </div>
    )
};

export default SelectChange;