import * as React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';

const download = (e) => {
    e.preventDefault();

    // get request
    axios({
        url: 'http://localhost:8000/downloadFile',
        method: 'GET',
        responseType: 'blob',
    }).then((res) => {
        console.log(res)
        FileDownload(res.data, 'downloaded.pptx')
    })

    // axios.get('//localhost:8000/downloadFile')
    //     .then(res => {
    //         // res.data = the picArray from the server (fileNameArray)
    //         console.log(res)
    //         FileDownload(res.data, 'downloaded.pptx')
    //     })

}

function DownloadFile() {
    return (
        <div className="home">
            <h1>download file</h1>

            <button onClick={(e) => download(e)}>Download</button>


            {/* <a href="/server/uploads/semiSave.pptx" download> Download your file</a> */}

        </div>
    )
};

export default DownloadFile;