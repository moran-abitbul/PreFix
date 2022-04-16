import React, { useState } from 'react';
import MultiSelect from 'multiselect-react-dropdown';



function MultiSelectOpt() {

    const data = [
        { Feature: 'TextColor', id: 1 },
        { Feature: 'BGColor', id: 1 },
        // { Feature: 'Video&Pic', id: 1 },
        // { Feature: 'Question', id: 1 }
    ]

    const [options] = useState(data)

    return (
        <div style={{ width: '40%', justifyContent: 'center', display: 'flex' }}>
            <div className="multiSelect">

                <h3 style={{ color: '#289ebd' }}>MultiSelect Dropdown</h3>

                <MultiSelect options={options} displayValue={"Feature"} />

            </div>
        </div>

    );

};

export default MultiSelectOpt;

