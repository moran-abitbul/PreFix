import { FileUploader } from './comps/fileUploader/FileUploader';
import Home from './comps/home/HomePage';
import ShowChange from './comps/showChange/ShowChange';
import SelectChange from './comps/selectChange/SelectChange';

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//Root component
function App() {
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
          <Route exact path = "/"> 
            <Home />
          </Route>
          <Route path = "/fileUploader"> 
            <FileUploader />
          </Route>
          <Route path = "/selectChange"> 
            <SelectChange />
          </Route>
          <Route path = "/showChange"> 
            <ShowChange />
          </Route>      
      </Router> 
</div>
  );
}

export default App;