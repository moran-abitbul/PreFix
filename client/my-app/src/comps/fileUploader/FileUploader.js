import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'
import Button from '@mui/material/Button';
//import { BarLoader } from 'react-spinner-animated';
//import BarLoader from 'react-bar-loader'

//export const FileUploader = ({ setPicArray, setUpdatedFile }) => {
export const FileUploader = ({ setPicArray }) => {

    const history = useHistory();

    //console.clear();
    //Null- there is no file
    const [file, setFile] = useState(null);
    const [showUploadFile, setShowUploadFile] = useState(true);
    const [showLoadState, setShowLoadState] = useState(false);

    useEffect(() => {
        console.log('file changed')
        console.log(file)
        localStorage.removeItem('picsArray'); // remove the old pics array before upload file
        localStorage.removeItem('updatedFile'); // remove the old pics array before upload file
    }, [file]);

    const onInputChange = (e) => {

        // Prevent to refresh the page    
        setFile(e.target.files[0])
    };

    const OnSubmit = (e) => {

        e.preventDefault();

        //show load component
        console.log('show load component');

        setShowLoadState(true)
        setShowUploadFile(false)

        //e.stopPropagation();
        const data = new FormData();
        data.append('file', file);

        axios.post('//localhost:8000/upload', data)
            .then(res => {

                // res.data = the picArray from the server (fileNameArray)
                //Set the pic array to show
                setPicArray(res.data)


                //Set the name of the update file
                window.localStorage.setItem('updatedFile', `updated-${file.name}`); //update the updated file for downloadFile component 

                // console.log('after get pic array')
                console.log('in file route: after history:')
                console.log(res.data)

                history.push("/showChange");


            })
            .catch((e) => {
                console.error('Error', e)
            })
    };

    return (
        <div className="file">

            {showUploadFile &&
                <form method="POST" action="#" id="#" onSubmit={OnSubmit}>
                    <div className="form-group files">
                        <h1>Upload Your File</h1>
                        <input type="file"
                            accept='.pptx'
                            onChange={onInputChange}
                            className="form-control"
                            multiple="#"
                            required={true} />
                    </div>
                    <br />
                    <button type="submit" > Start </button>
                    {/* <Button className='buttonStart' variant="contained" size="large" disabled={file === null} > Start</Button> */}
                </form>}

            {showLoadState &&
                <Spinner text={"Improve your presentation"} width={"120px"} height={"200px"} center={true} />
            }

            <br />
            <br />
            <br />

            {/* {showLoadState && <div>
                <h2>Improve your presentation</h2>
                <BarLoader color="#1D8BF1" height="3" />
            </div>
            } */}

        </div>
    )
};