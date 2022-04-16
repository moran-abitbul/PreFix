import React from 'react';
import { Link } from 'react-router-dom';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function SelectChange() {

    return (
        <div className="selectChange">
            <h1>Please select your Changes</h1>

            {/* print slide of presentation */}


            <h4>בחר את השינויים שברצונך להחיל את המצגת</h4>
            <br />
            <br />
            <br />

            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Font" />
                <FormControlLabel control={<Switch defaultChecked />} label="Font Color" />
                <FormControlLabel control={<Switch defaultChecked />} label="Background Color" />
                <FormControlLabel control={<Switch defaultChecked />} label="Video" />
                <FormControlLabel control={<Switch defaultChecked />} label="Pictures" />
            </FormGroup>

            <Link to="/fileUploader">
                <button>Lets Start Baby !!</button>
            </Link>
        </div>
    )
};

export default SelectChange;