import React from 'react';
import './style.css';
import logoImage from './logo.jpeg';
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function HomePage() {
    return (
        <div className="home">
            <h1>PreFix</h1>

            <img src={logoImage} alt="Logo" />

            <h3>תקנון האתר</h3>

            {/* <ul>
                <li>שלום וברכה</li>
                <li>אתם מתחייבים ל</li>
            </ul> */}


            <br />
            <br />

            <br />

            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="הנני מסכים" />
            </FormGroup>


            <Link to="/selectChange">
                <Stack spacing={2} direction="row">
                    <Button class = 'buttonStart' variant="contained">Start</Button>
                </Stack>
            </Link>
            {/*     
        <Link to ="/fileUploader">
            <button>הנני מסכים לתנאים</button>
        </Link> */}

        </div>
    )
};

export default HomePage;