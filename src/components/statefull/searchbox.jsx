//jshint esversion:6
import React, { useState ,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ThemeContext from "../../context/context";

import AppTheme from "../../AppTheme";

import SearchBoxAutoSuggest from "../stateless/searchBoxAutoSuggest";

function SearchBox() {
  const theme=useContext(ThemeContext)[0];
  const currentTheme=AppTheme[theme];
  const [isFocused, setIsFocused] = useState(false);

  function searchBoxFocuseChanged() {
    setIsFocused(!isFocused);
  }

  return (
    <div>
      <form>
        <div >
          <input
            className="searchBox"
            type="text"
            placeholder="Search"
            onFocus={searchBoxFocuseChanged}
            onBlur={searchBoxFocuseChanged}
          ></input>
          <button className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {isFocused && <SearchBoxAutoSuggest backgroundColor={`${currentTheme.primaryColorMedium}`}/>}
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
