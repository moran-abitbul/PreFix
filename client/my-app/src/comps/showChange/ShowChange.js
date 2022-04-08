import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function ShowChange() {
    return (
        <div className="showChange">
            <h1>Your Changes:</h1>

            <Stack spacing={2}>
                <Pagination count={10} />
                <Pagination count={10} color="primary" />
            </Stack>

        </div>
    );
};

export default ShowChange;


// export const ShowChange = () => {
//     return (
//         <div className="showChange">
//             <h1>Your Changes:</h1>
//         </div>
//     );
// };
