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

    // State that will keep track of which checkboxes are checked using boolean 
    const [selectedItemType, setSelectedItemType] = useState(new Array(itemTypeOptions.length).fill(false))
    // In case you close dropdown and reopen it, this ensures the dropdown looks the same way you left it
    for (const itemTypeOption of itemTypeOptions) {
        if (filter["category"] && filter["category"].indexOf(itemTypeOption["name"]) >= 0) {
            selectedItemType[itemTypeOption["index"]] = true
        }
    }

    let itemTypeInput = []

    const handleOnChange = (index) => {
        setSelectedItemType((prevSelectedItemType) => {
            let newSelectedItemType = [...prevSelectedItemType]
            // Records whether checkbox was selected/unselected
            newSelectedItemType[index] = !prevSelectedItemType[index]
            
            // Updates the filter criteria based on selected items
            setFilter(prevFilter => {
                let newFilter = {}
                Object.keys(prevFilter).forEach((key) => {
                    newFilter[key] = [...prevFilter[key]]
                    
                })
                
                if (newSelectedItemType[index]) {
                    if ("category" in prevFilter && prevFilter["category"].indexOf(itemTypeOptions[index].name) < 0) {
                        newFilter["category"].push(itemTypeOptions[index].name)
                    } else if (!("category" in prevFilter)) {
                        newFilter["category"] = [itemTypeOptions[index].name]
                    }
                } else if (prevFilter["category"]) {
                    const indexToRemove = filter["category"].indexOf(itemTypeOptions[index].name);

                    if (indexToRemove >= 0) { 
                        newFilter["category"].splice(indexToRemove, 1);
                    }
                }

                setPosts(() => {
                    let posts = data.filter((post) => {
                        for (let key in newFilter) {
                            if (newFilter[key].length > 0 && newFilter[key].indexOf(post[key]) < 0){
                                return false
                            }
                        }
                        return true
                    })

                    return posts
                })

                return newFilter
            })
            console.log(newSelectedItemType)
            return newSelectedItemType
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
            <h3>Item Type:</h3>
            {itemTypeInput}
        </div>
    )
}

export default Filter