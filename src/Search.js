import React, { useState } from 'react'
import "./Search.css"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import { actionTypes } from './reducer';
import {useStateValue} from "./StateProvider"
function Search() {

    const [input, setInput] = useState('')    
    const [{}, dispatch] = useStateValue();

    const performSearch = (e) => { 
        e.preventDefault();
        console.log(input);
        dispatch({
            type: actionTypes.SET_INPUT,
            searchText: input,
        })
        setInput('');
    }

    return (
        <div>
        <form className="sidebar__searchContainer" >
            <SearchOutlinedIcon  />
            <input className="search__input" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Search for a room or a message"
                type="text" />
            <button className="search__button"type="submit" onClick={performSearch}><CancelIcon /> </button>
        </form>
        </div>
    )
}

export default Search;
