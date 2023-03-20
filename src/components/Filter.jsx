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
    const itemTypeOptions = {
        category: [
            {"index": 0, "name": "furniture"}, 
            {"index": 1, "name": "home decor"}, 
            {"index": 2, "name": "clothing"}, 
            {"index": 3, "name": "tech items"}, 
            {"index": 4, "name": "other"}
        ],
        condition: [
            {"index": 0, "name": "new"}, 
            {"index": 1, "name": "old"}, 
        ]
    }

    // State that will keep track of which checkboxes are checked using boolean 
    const [selectedItemType, setSelectedItemType] = useState(() => {
        let temp = {}
        Object.keys(itemTypeOptions).forEach((key) => {
            temp[key] = new Array(itemTypeOptions[key].length).fill(false)

            // In case you close dropdown and reopen it, this ensures the dropdown looks the same way you left it
            for (const itemTypeOption of itemTypeOptions[key]) {
                if (filter[key] && filter[key].indexOf(itemTypeOption["name"]) >= 0) {
                    temp[key][itemTypeOption["index"]] = true
                }
            }
        })
        return temp
    })

    const handleOnChange = (key, index) => {
        setSelectedItemType((prevSelectedItemType) => {
            let newSelectedItemType = {}
            Object.keys(prevSelectedItemType).forEach((key) => {
                newSelectedItemType[key] = [...prevSelectedItemType[key]]  
            })

            // Records whether checkbox was selected/unselected
            newSelectedItemType[key][index] = !prevSelectedItemType[key][index]
            
            // Updates the filter criteria based on selected items
            setFilter(prevFilter => {
                let newFilter = {}
                Object.keys(prevFilter).forEach((key) => {
                    newFilter[key] = [...prevFilter[key]]  
                })
                
                if (newSelectedItemType[key][index]) {
                    if (key in prevFilter && prevFilter[key].indexOf(itemTypeOptions[key][index].name) < 0) {
                        newFilter[key].push(itemTypeOptions[key][index].name)
                    } else if (!(key in prevFilter)) {
                        newFilter[key] = [itemTypeOptions[key][index].name]
                    }
                } else if (newFilter[key]) {
                    const indexToRemove = newFilter[key].indexOf(itemTypeOptions[key][index].name);

                    if (indexToRemove >= 0) { 
                        newFilter[key].splice(indexToRemove, 1);
                    }
                }

                // Updates posts based on the new filter criteria
                setPosts(() => {
                    let posts = data.filter((post) => {
                        for (let key in newFilter) {
                            if (newFilter[key].length > 0 && newFilter[key].indexOf(post[key]) < 0){
                                return false
                            }
                        }
                        return true
                    })
                    console.log(newFilter)
                    console.log(posts)
                    return posts
                })

                return newFilter
            })

            return newSelectedItemType
        })
    }

    let itemTypeInput = {}
    Object.keys(itemTypeOptions).forEach((key) => {
        itemTypeInput[key] = []
    
        for (let itemType of itemTypeOptions[key]){
            itemTypeInput[key].push(
                <div key={`div-${itemType.index}`}>
                    <input className='flex-direction-row'
                        type="checkbox"
                        id={`checkbox-${itemType.index}`}
                        name={itemType.name}
                        value={itemType.name}
                        checked={selectedItemType[key][itemType.index]}
                        onChange={() => handleOnChange(key, itemType.index)}
                    />
                    <label htmlFor={`custom-checkbox-${itemType.index}`} key={`label-${itemType.index}`}>{itemType.name}</label>
                </div>
            )
        }
    })

    return (
        <div className='flex flex-col' style={{backgroundColor: 'rgb(240 197 82 / var(--tw-bg-opacity))'}}>
            <h3>Item Type:</h3>
            {itemTypeInput["category"]}

            <h3>Item Condition:</h3>
            {itemTypeInput["condition"]}
        </div>
    )
}

export default Filter