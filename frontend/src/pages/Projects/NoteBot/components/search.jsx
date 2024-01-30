import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
//import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
//import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
//import Divider from '@mui/material/Divider';
import { getNotesByCourseAndNoteTitle } from "../utils/api"
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";


const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = async () => {
    // Make sure searchValue is defined before making the API call
    if (searchValue) {
      //const userId = 'a19d4fd7-2052-42e4-8ab2-56db09944363';  // Replace with the actual user ID
      try {
        const result = await getNotesByCourseAndNoteTitle(searchValue);
        console.log(result);
        navigate('/projects/notebot/search',
          {
          state: { searchResults: result.cards, keyword: searchValue },
        });
        // Handle the result as needed
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle the error
      }
    } else {
      console.error('Search value is undefined or empty.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  // <Divider style={{ backgroundColor: '#ED7D31', marginTop: '-26px', marginLeft: '80px', width: '60%' }} />


  return (
    <div>
      <Toolbar style={{ marginLeft: '80px', width: '80%', backgroundColor: 'transparent', padding: '0' }}>
        <div style={{ marginTop: '-30px', position: 'relative', borderRadius: '0px', backgroundColor: 'transparent', width: '80%', height: '120%' }}>
          <div
            style={{
              padding: '8px',
              height: '100%',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={handleSearchClick}
          >
            <SearchIcon style={{ color: "#ED7D31" }} />
          </div>
          {/* <Autocomplete
            freeSolo
            options={latestSearches}
            inputValue={searchValue}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <InputBase
                {...params}
                placeholder="SEARCH…"
                style={{ padding: '8px 48px', width: '100%' }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchClick();
                  }}
                }
              />
            )}
          /> */}
           <TextField
              placeholder="SEARCH…"
              style={{ padding: '8px 48px', width: '100%', color: 'transparent' }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              variant="standard"
            />
        </div>
      </Toolbar>
      {/* {showLatestSearches && (
        <div style={{ padding: '8px', marginLeft: '80px' }}>
          <h4>Latest Searches:</h4>
          <ul>
            {latestSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>
      )} */}
      {/* Your content goes here */}
      {/* <ul>
        {searchResults.map((result) => (
          <li key={result._id}>{result.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default SearchComponent;
