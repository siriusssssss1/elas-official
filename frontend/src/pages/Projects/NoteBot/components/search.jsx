import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';

const SearchPage = () => {
  const [showLatestSearches, setShowLatestSearches] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const latestSearches = ["Search 1", "Search 2", "Search 3"];

  const handleSearchClick = () => {
    setShowLatestSearches(!showLatestSearches);
  };

  const handleInputChange = (event, value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Toolbar style={{ marginLeft: '80px', width: '80%', backgroundColor: 'transparent', padding: '0' }}>
        <div style={{ marginTop: '-30px', position: 'relative', borderRadius: '0px', backgroundColor: '#ffffff', width: '80%', height: '120%' }}>
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
          <Autocomplete
            freeSolo
            options={latestSearches}
            inputValue={searchValue}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <InputBase
                {...params}
                placeholder="Search…"
                style={{ padding: '8px 48px', width: '100%' }}
                inputProps={{ 'aria-label': 'search' }}
              />
            )}
          />
        </div>
      </Toolbar>
      {showLatestSearches && (
        <div style={{ padding: '8px', marginLeft: '80px' }}>
          <h4>Latest Searches:</h4>
          <ul>
            {latestSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>
      )}
      <Divider style={{ backgroundColor: '#ED7D31', marginTop: '-23px', marginLeft: '80px', width: '60%' }} />
      {/* Your content goes here */}
    </div>
  );
};

export default SearchPage;
