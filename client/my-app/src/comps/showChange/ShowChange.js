import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Carousel from 'react-elastic-carousel'
import MultiCheckBox from '../multiCheckBox/MultiCheckBox'

import "./showChange.css";


function ShowChange({ picArray }) {

    const [picsArray, setPicsArray] = useState(picArray);

    useEffect(() => {
        const resStr = (window.localStorage.getItem('picsArray'))
        if (resStr) {
            setPicsArray(resStr.split(','));
        }
        //makeGetRequest();
    }, []);

    useEffect(() => {
        window.localStorage.setItem('picsArray', picsArray); //when refresh the page update the current pics array 
    });

    const [data, setData] = useState(null);

    async function makeGetRequest() {
        let res = await axios.get('//localhost:8000/showChange')
        let dataFromServer = res.data.massage;
        console.log(res.data.massage)
        setData(dataFromServer);
    }

    return (
        <div className="showChange">
            <h1>Your Changes:</h1>

            {/* <h1>{picsArray}</h1> */}
            {/* <div>{data}</div> */}

            <br />

            {/*shown the pic array  */}
            {/* change picsArray!!!!!!!!!!!!!!!!!!!!! */}
            {picsArray !== undefined && <Carousel style={{ alignItems: 'center' }} itemPadding={[40, 200]} itemsToScroll={3} itemsToShow={3} >

                {picsArray.map((picSrc) => {
                    return (<div>
                        <img className="photo" src={require(`./slidePic/${picSrc}`)} key={picSrc} alt='' />
                        {/* <MultiCheckBox /> */}
                    </div>)
                })}

                {/* <img src={require('./slidePic/slidePic.jpg')} alt='' /> */}

            </Carousel>}

            <br />
            <br />

            <Link to="/downloadFile">
                <Button className='buttonStart' variant="contained" size = 'small'>End and download your final file</Button>
            </Link>

        </div >
    );
};

export default ShowChange;