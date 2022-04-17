import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./showChange.css";

import Carousel from 'react-elastic-carousel'
import MultiselectOpt from '../multiSelect/MultiSelectOpt'
import MultiCheckBox from '../multiCheckBox/MultiCheckBox'

// import pic1 from './slidePic/slidePic-1.jpg' //in src folder
// import pic2 from './slidePic/slidePic-2.jpg' //in src folder
// import pic3 from './slidePic/slidePic-3.jpg' //in src folder
// import pic4 from './slidePic/slidePic-4.jpg' //in src folder


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

    // const makeGetRequest = () => {
    //     return axios
    //         .get('//localhost:8000/selectChange')
    //         .then(res => {
    //             console.log(res.data.name)
    //             setData({ text: res.data.name })
    //         })
    //         .catch((err) => console.error(err));
    // };


    //var path = `./slidePic/${picArray.data[0]}`; //in public folder

    //console.log(picArray.data)

    const arrayOfPicNames = ['slidePic-1.jpg', 'slidePic-2.jpg', 'slidePic-3.jpg', 'slidePic-4.jpg', 'slidePic-5.jpg', 'slidePic-6.jpg', 'slidePic-7.jpg', 'slidePic-8.jpg', 'slidePic-9.jpg', 'slidePic-10.jpg', 'slidePic-11.jpg'];

    console.log(arrayOfPicNames);
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

            <Carousel itemPadding={[50, 100]} itemsToScroll={3} itemsToShow={3} >
                {arrayOfPicNames.map(picSrc => {
                    return <img src={require(`./slidePic/${picSrc}`)} key={picSrc} alt='' />
                })}
            </Carousel>

            <MultiCheckBox />

            <MultiselectOpt />

        </div >
    );

};

export default ShowChange;
