import React from 'react';
import logoImage from './PreFixLogo.jpeg';
import bgImage from './PreFixBG.jpeg';
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

            <Navbar bg="light" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <img
                            src={logoImage}
                            width="120"
                            height="80"
                            // className="d-inline-block align-top"
                            alt=""
                        />{' '}
                        {/* <h1>PreFix</h1> */}
                    </Navbar.Brand>
                </Container>
            </Navbar>


            <h1>PreFix</h1>
            <h2>Turning a textual presentation into an interactive one</h2>

            <img src={bgImage} className="bgImage" alt="Logo" />

            <br />
            <br />
            <br />

            <h3>Terms</h3>
            {/* <h5>אתם מתחייבים לכך שיעשה שימוש במצגות לצורך למידה של דוגמאות </h5> */}

            <FormControlLabel control={<Checkbox required={true} onChange={(e) => setChecked(e.currentTarget.checked)} />} label="I agree" />

            {/* <Link to="/fileUploader">
                <Stack spacing={10} direction="center">
                    <Button className='buttonStart' variant="contained">Start</Button>
                </Stack>
            </Link> */}

            {/* <Link to="/fileUploader">
                <button>הנני מסכים לתנאים</button>
            </Link> */}

            <br />
            <br />

            <br />  


            {/* this is history push
             <Link to="/fileUploader">
                <Button className='buttonStart' variant="contained" size="large" disabled={checked === false} onClick={(e) => checkStart()} >Start</Button>
            </Link> */}

            <Button className='buttonStart' variant="contained" size="large" disabled={checked === false} onClick={() => checkStart()} >Lets start</Button>

        </div>
    )
};

export default HomePage;