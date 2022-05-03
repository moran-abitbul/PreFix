import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./showChange.css";

import Carousel from 'react-elastic-carousel'
import MultiCheckBox from '../multiCheckBox/MultiCheckBox'

function ShowChange({ picArray }) {

    useEffect(() => {
        makeGetRequest();
    }, []);

    const [data, setData] = useState(null);


    async function makeGetRequest() {
        let res = await axios.get('//localhost:8000/showChange')
        let dataFromServer = res.data.massage;
        console.log(res.data.massage)
        setData(dataFromServer);
    }

    //var path = `./slidePic/${picArray.data[0]}`; //in public folder

    return (
        <div className="showChange">
            <h1>Your Changes:</h1>

            {/*             
            <h1>{path}</h1> */}

            {/* <img src={require('./slidePic/slidePic-1.jpg')} alt='' /> */}

            {/* <CarouselWrapper mode="gallery" >
                
            </CarouselWrapper > */}

            {/* {picArray.data.map(picSrc => {

                return <img src={require(`./slidePic/${picSrc}`)} alt='' />

            }
            )} */}

            <div>{data}</div>
            <br />
            <br />
            <br />

            {/*shown the pic array  */}
            <Carousel style={{ alignItems: 'center' }} itemPadding={[50, 200]} itemsToScroll={3} itemsToShow={3} >
                {picArray.map(picSrc => {
                    return (<div>
                        <img className="photo" src={require(`./slidePic/${picSrc}`)} key={picSrc} alt='' />
                        <MultiCheckBox />
                    </div>)

                })}
            </Carousel>

            {/* <MultiselectOpt /> */}

            <Link to="/downloadFile">
                <button>End and download your final file</button>
            </Link>

        </div >
    );
};

export default ShowChange;
