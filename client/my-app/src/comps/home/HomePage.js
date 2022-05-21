import React from 'react';
import logo from './logo-r.png';
import aboutUs from './about-us-mimosaa-collection.png';
import bgImage from './pres-prefix.PNG';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './style.css';

import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';

function HomePage() {

    const history = useHistory();

    const [checked, setChecked] = useState(false);
    console.log(checked);

    useEffect(() => {
        localStorage.removeItem('picsArray'); // remove the old pics array before upload file
        localStorage.removeItem('updatedFile'); // remove the old updated file before upload file
    }, []);


    //move to the next page just if the value is true
    const checkStart = (() => {

        if (checked) {
            history.push("/fileUploader");
        }
    })

    return (
        <div className="home">

            <a href="https://moranabitbul1.wixsite.com/prefix">
                <img src={aboutUs} className="aboutUs" alt="about-us" />
            </a>

            <img src={logo} className="logo" alt="logo" />

            <img src={bgImage} className="bgImage" alt="bg" />

            <br />
            <br />
            <br />
            <Button className='buttonStart' variant="contained" size="large" disabled={checked === false} onClick={() => checkStart()} >START</Button>
            <br />
            <br />
            <span className="agree">
                <a className="text-agree">קראתי והסכמתי לתקנון של האתר</a>
                <FormControlLabel className="btn-agree" control={<Checkbox required={true} onChange={(e) => setChecked(e.currentTarget.checked)} />} />
            </span>



            {/* <h3>Terms</h3> */}
            {/* <h5>אתם מתחייבים לכך שיעשה שימוש במצגות לצורך למידה של דוגמאות </h5> */}
            {/* <FormControlLabel control={<Checkbox required={true} onChange={(e) => setChecked(e.currentTarget.checked)} />} className="agree" label="קראתי והסכמתי לתקנון של האתר" /> */}
            {/* <Link to="/fileUploader">
                <Stack spacing={10} direction="center">
                    <Button className='buttonStart' variant="contained">Start</Button>
                </Stack>
            </Link> */}

            {/* <Link to="/fileUploader">
                <button>הנני מסכים לתנאים</button>
            </Link> */}


            {/* this is history push
             <Link to="/fileUploader">
                <Button className='buttonStart' variant="contained" size="large" disabled={checked === false} onClick={(e) => checkStart()} >Start</Button>
            </Link> */}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


        </div>
    )
};

export default HomePage;