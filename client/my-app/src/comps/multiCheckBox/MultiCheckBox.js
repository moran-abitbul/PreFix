import React, { useState, useEffect } from 'react'
import CheckboxGroup from 'react-checkbox-group'
import './multiCheckBox.css'

function MultiCheckBox() {

    //const [fruits, setFruits] = useState()

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setFruits(['apple', 'orange'])
    //     }, 5000)

    //     return () => clearTimeout(timer)
    // }, [])


    function handleChange() {
        //send massage to server with the unique id
    }


    return (

        // <CheckboxGroup name="fruits" value={fruits} onChange={setFruits}>
        //     {(Checkbox) => (
        //         <>
        //             {/* <label>
        //                 <Checkbox value="apple" />
        //                 {fruits.map(fruit => {
        //                     return { fruit }
        //                 })}

        //             </label> */}

        //             <div>
        //                 <Checkbox value="orange" /> Orange
        //             </div>
        //             <div>
        //                 <Checkbox value="watermelon" /> Watermelon
        //             </div>
        //         </>
        //     )}
        // </CheckboxGroup>

        <div>
            <form>
                <br />

                <label>
                    <input type="checkbox" onChange={handleChange} />
                    <span>Text Color</span>
                </label>

                <br></br>
                <label>
                    <input type="checkbox" onChange={handleChange} />
                    <span>Background Color</span>
                </label>

            </form>
        </div>
    )
};

export default MultiCheckBox;