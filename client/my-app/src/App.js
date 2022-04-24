import { FileUploader } from './comps/fileUploader/FileUploader';
import Home from './comps/home/HomePage';
import ShowChange from './comps/showChange/ShowChange';
import SelectChange from './comps/selectChange/SelectChange';
import DownloadFile from './comps/downloadFile/DownloadFile'
import { useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Root component
function App() {

  //like global state
  const [picArray, setPicArray] = useState();
  //const [picArrayAfterChange, setPicArrayAfterChange] = useState();


  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fileUploader" element={<FileUploader />} />
        <Route path="/selectChange" element={<SelectChange />} />
        <Route path="/showChange" element={<ShowChange />} />
      </Routes> */}


      {/* switch- only one route shows at any one time  */}

      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/fileUploader">
          <FileUploader setPicArray={setPicArray} />
        </Route>
        <Route path="/selectChange">
          <SelectChange />
        </Route>
        <Route path="/showChange">
          <ShowChange picArray={picArray} />
        </Route>
        <Route path="/downloadFile">
          <DownloadFile />
        </Route>
      </Router>
    </div>
  );
}

export default App;