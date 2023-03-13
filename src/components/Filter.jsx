import React, { useState } from 'react';

function Filter({filter, setFilter, data}) {
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
                { showDropdown ? <FilterDropdown filter={filter} setFilter={setFilter} data={data}/> : null}
            </div>
        </div>

    )
}

function FilterDropdown({filter, setFilter, data}) {
    let itemTypeOptions = [
        {"index": 0, "name": "furniture"}, 
        {"index": 1, "name": "home decor"}, 
        {"index": 2, "name": "clothing"}, 
        {"index": 3, "name": "tech items"}, 
        {"index": 4, "name": "other"}
    ]
    const [selectedItemType, setSelectedItemType] = useState(new Array(itemTypeOptions.length).fill(false))
    let itemTypeInput = []

    const handleOnChange = (index) => {
        let temp = []
        for (let i = 0; i < selectedItemType.length; i++) {
            temp.push(selectedItemType[i])
            if (i === index) {
                temp[i] = !temp[i]  
                
                if (temp[i]){
                    if ("category" in filter) {
                        filter["category"].push(itemTypeOptions[index].name)
                    } else {
                        let temp1 = filter
                        temp1["category"] = [itemTypeOptions[index].name]
                        setFilter(temp1)
                    }
                } else if (filter["category"]) {
                    const indexToRemove = filter["category"].indexOf(itemTypeOptions[index].name);
                    console.log(filter["category"])
                    if (indexToRemove > -1) { 
                        filter["category"].splice(indexToRemove, 1);
                    }
                }
            }
        }

        setSelectedItemType(temp)
    }
    for (let itemType of itemTypeOptions){
        itemTypeInput.push(
            <input className='flex-direction-column'
                type="checkbox"
                id={`custom-checkbox-${itemType.index}`}
                name={itemTypeOptions[itemType.name]}
                value={itemTypeOptions[itemType.name]}
                checked={selectedItemType[itemType.index]}
                onChange={() => handleOnChange(itemType.index)}
            />,
            <label htmlFor={`custom-checkbox-${itemType.index}`}>{itemType.name}</label>
        )
    }

    return (
        <div className='flex flex-direction-column'>
            {itemTypeInput}
        </div>
    )
}

export default Filter