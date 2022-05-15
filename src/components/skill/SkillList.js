import React from "react";
import { useHistory } from "react-router";
import SkillCard from "./SkillCard";
import SkillDetail from "./SkillDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const SkillList = ({ className, idList, dataList, onClick, sortFlag = false, size = "medium" }) => {
  // const ua = useUa();
  // const history = useHistory();
  const sort = {
    key: "rare",
    data: [
      { value: "ノーマル", title: "普通" },
      { value: "レア", title: "金色 稀有" },
      { value: "固有", title: "独特" },
    ],
  };
  return (
    <List
      className={className}
      listKey="skills"
      idList={idList}
      dataList={dataList}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <SkillCard
          key={data.id}
          data={data}
          onClick={
            () => (onClick ? onClick(data) : setCur(data))
          }
        />
      )}
      detailRender={(data) => <SkillDetail data={data} isNur={false} />}
    // detailModalSize='regular'
    />
  );
};

export default SkillList;
