import React, { useState } from 'react';

function Filter({filter, setFilter, data, setPosts}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const onClick = () => setShowDropdown(!showDropdown)

    document.addEventListener('click', (e) => {
        if (showDropdown && !document.getElementById('filterDropdown').contains(e.target) && !document.getElementById('filterButton').contains(e.target) ) {
            setShowDropdown(false)
        }
    })
    
    return (       
        <div className="flex flex-col">
            <button onClick={onClick} id="filterButton" className="btn mt-2 bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0">
                Filter
            </button>

            <div id="filterDropdown">
                { showDropdown ? <FilterDropdown filter={filter} setFilter={setFilter} data={data} setPosts={setPosts} /> : null}
            </div>
        </div>
    )
}

function FilterDropdown({filter, setFilter, data, setPosts}) {
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
        setSelectedItemType((selectedItemType) => {
            // Records whether checkbox was selected/unselected
            selectedItemType[index] = !selectedItemType[index]

            // Updates the filter criteria based on selected items
            setFilter(filter => {
                if (selectedItemType[index]) {
                    if ("category" in filter && filter["category"].indexOf(itemTypeOptions[index].name) < 0) {
                        filter["category"].push(itemTypeOptions[index].name)
                    } else if (!("category" in filter)) {
                        filter["category"] = [itemTypeOptions[index].name]
                    }
                } else if (filter["category"]) {
                    const indexToRemove = filter["category"].indexOf(itemTypeOptions[index].name);

                    if (indexToRemove >= 0) { 
                        filter = filter["category"].splice(indexToRemove, 1);
                    }
                }

                return filter
            })
            
            return selectedItemType
        })

        setPosts(() => {
            let posts = data.filter((post) => {
                for (let key in filter) {
                    if (filter[key].length > 0 && filter[key].indexOf(post[key]) < 0){
                        return false
                    }
                }
                return true
            })
    
            return posts
        })
    }

    for (let itemType of itemTypeOptions){
        itemTypeInput.push(
            <div>
                <input className='flex-direction-row'
                    key={`custom-checkbox-${itemType.index}`}
                    type="checkbox"
                    id={`custom-checkbox-${itemType.index}`}
                    name={itemType.name}
                    value={itemType.name}
                    checked={selectedItemType[itemType.index]}
                    onChange={() => handleOnChange(itemType.index)}
                />
                <label htmlFor={`custom-checkbox-${itemType.index}`}>{itemType.name}</label>
            </div>
        )
    }

    return (
        <div className='flex flex-col' style={{backgroundColor: 'rgb(240 197 82 / var(--tw-bg-opacity))'}}>
            {itemTypeInput}
        </div>
    )
}

export default Filter