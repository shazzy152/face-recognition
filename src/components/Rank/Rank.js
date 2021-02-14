import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className="" >
           <div className='black f3 mt3'>
                {`Hi ${name}, your entry count is :`}
           </div>
           <div className='black f1'>
                {entries}
           </div> 
        </div>
    )
}

export default Rank
