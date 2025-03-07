import { useEffect, useState } from "react";
import { useAxiosWithAuthorization } from "../../utils/api";
import AUIGrid from "../../lib/AuiGrid/AUIGridReact";

const WgtReduceSelectBox = (props) => {
  //혼적코드 검색 URL
  const SEARCH_CODE_URL = "/common/code/searchWgtReduce";

  const [, fetchCodeData] = useAxiosWithAuthorization(
    {
      url: SEARCH_CODE_URL,
    },
    { manual: true }
  );

  const [codeData, setCodeData] = useState([]);

  const codeSearch = async () => {
    const {
      data: { data },
    } = await fetchCodeData({
      url: SEARCH_CODE_URL,
      params: {
        custCd: props.custCd,
        custNm: props.custNm,
        prodNm: props.prodNm,
      },
    });

    setCodeData(data);
  };

  // useEffect(() => {
  //   codeSearch();
  // }, []);

  useEffect(() => {
    // console.log("prodNm : ", props.prodNm, "custNm : ", props.custNm);
    codeSearch();
  }, [props.custNm, props.prodNm]);

  //console.log("props.label : " + props.label);
  return (
    <select
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      disabled={props.disabled}
      className={props.className}
    >
      {props.topSelected !== undefined ? <option value="">{props.topSelected}</option> : ""}

      {codeData &&
        codeData.map((code) => (
          <option
            wgt-value={code.unitWeight}
            value={code.reduceCd}
            key={code.selKey}
            desc-value={code.reduceDesc}
            custcd-value={code.custCd}
            custnm-value={code.custNm}
          >
            {code.reduceDesc} - {code.custNm}
          </option>
        ))}
    </select>
  );
};

export default WgtReduceSelectBox;
