import React from "react";
import { useHistory } from "react-router";
import PlayerCard from "./PlayerCard";
import PlayerDetail from "./PlayerDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const PlayerList = ({ listClass, dataList, onClick, sortFlag = false }) => {
  const ua = useUa();
  const history = useHistory();
  const sort = {
    key: "rare",
    data: [
      { value: "3", title: "3星" },
      { value: "2", title: "2星" },
      { value: "1", title: "1星" },
    ],
  };
  return (
    <List
      className={listClass}
      listKey="players"
      dataList={dataList}
      sort={sortFlag && sort}
      itemRender={(data, setCur) => (
        <div className='w-24 max-w-1/4 p-1'>
          <PlayerCard
            className=""
            data={data}
            onClick={() =>
              onClick
                ? onClick(data)
                : ua.isPhone
                  ? history.push(`/player-detail/${data.id}`)
                  : setCur(data)
            }
          />
        </div>
      )}
      detailRender={(data) => <PlayerDetail data={data} isNur={false} />}
    ></List>
  );
};

export default PlayerList;
