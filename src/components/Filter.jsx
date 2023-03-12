import React, { useState } from 'react';

function Filter() {
    const [showDropdown, setShowDropdown] = useState(false)
    const onClick = () => setShowDropdown(!showDropdown)

    document.addEventListener('click', (e) => {
        if (showDropdown && !document.getElementById('filterDropdown').contains(e.target) && !document.getElementById('filterButton').contains(e.target) ) {
            setShowDropdown(false)
        }
    })
    
    return (       
        <div className="flex">
            <button onClick={onClick} id="filterButton" className="btn mt-2 bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0">
                Filter
            </button>

            <div id="filterDropdown">
                { showDropdown ? <FilterDropdown/> : null}
            </div>
        </div>

    )
}

function FilterDropdown() {
    return (
        <div>
        <p> dropdown works
        </p>
        </div>
    )
}

export default Filter