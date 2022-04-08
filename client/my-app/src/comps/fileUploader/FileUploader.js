import { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useHistory } from 'react-router-dom';


export const FileUploader = () => {
    const history = useHistory();

    console.clear();
    //Null- there is no file
    const [file, setFile] = useState(null);

    const onInputChange = (e) => {

        // Prevent to refresh the page    
        setFile(e.target.files[0])
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        //e.stopPropagation();

        const data = new FormData();

        data.append('file', file);

        axios.post('//localhost:8000/upload', data)
            .then((e) => { // res = e
                //console.log(e)
                history.push("/selectChange");

                //console.log("success!")                                
            })
            .catch((e) => {
                console.error('Error', e)
            })
    };

    return (
        <div className="file">
            <form method="POST" action="#" id="#" onSubmit={OnSubmit}>
                <div className="form-group files">
                    <h2>Upload Your File</h2>
                    <input type="file"
                        accept='.pptx'
                        onChange={onInputChange}
                        className="form-control"
                        multiple="#" />
                </div>

                <button type="submit" > Start </button>

            </form>

        </div>

    )
};