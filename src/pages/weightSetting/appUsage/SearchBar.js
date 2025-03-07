import React, { useCallback, useState } from "react";
import SelectBox from "../../../components/SelectBox/index.vue";
import useAppContext from "../../../utils/Reducers";

const SearchBar = (props) => {
  // SerachBar 기본 필드
  const INITIAL_SEARCH_FIELDS = {
    carNo: "",
  };

  const handleChangeField = useCallback((event) => {
    const { name, value } = event.target;

    INITIAL_SEARCH_FIELDS[name] = value;
    // console.log(INITIAL_SEARCH_FIELDS);
    props.setSearchParameters(INITIAL_SEARCH_FIELDS);
  });

  return (
    <>
      <div className="searchdata">
        <ul>
          <li>
            <div className="divide50">
              <font color="grey">⦁</font> 차량번호
            </div>
            <input type="text" className="datainput" name="carNo" onChange={handleChangeField} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default React.memo(SearchBar);
