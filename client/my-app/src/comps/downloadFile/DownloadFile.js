import * as React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const download = (e) => {
    e.preventDefault();

    // get request
    axios({
        url: 'http://localhost:8000/downloadFile',
        method: 'GET',
        responseType: 'blob',
    }).then((res) => {
        console.log('im in get request')
        console.log(res)
        FileDownload(res.data, 'downloaded.pptx') //file name to client
    })


    // axios.get('//localhost:8000/downloadFile')
    //     .then(res => {
    //         // res.data = the picArray from the server (fileNameArray)
    //         console.log(res)
    //         FileDownload(res.data, 'downloaded.pptx')
    //     })

}

//function DownloadFile({ updatedFile }) {

function DownloadFile() {

    const [updatedFile, setUpdatedFile] = useState(window.localStorage.getItem('updatedFile'));

    useEffect(() => {
        const fileRes = (window.localStorage.getItem('updatedFile')) //get the update file from the local storage
        if (fileRes) {
            setUpdatedFile(fileRes);
        }
        makePostRequest();
    }, []);

    useEffect(() => {
        window.localStorage.setItem('updatedFile', updatedFile); //when refresh the page update the current pics array 
    });


    async function makePostRequest() {

        axios.post('//localhost:8000/downloadFile', { updatedFile })
            .then(() => {
                console.log('hi')
            }).catch((e) => {
                console.error('Error', e)
            })
    }

    return (
        <div className="home">
            <h1>download file</h1>

            {/* <h1>{updatedFile}</h1> */}

            {/* <button onClick={(e) => download(e)}>Download</button> */}

            <br />
            <br />
            <br />
            <br />
            <br />

            <Button className='buttonStart' variant="contained" size='large' onClick={(e) => download(e)}>
                Download your file
            </Button>

        </div>
    )
};

export default DownloadFile;