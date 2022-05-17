import React from "react";

import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import List from "../common/List";

const events = [
  { title: "切れ者", func: (data) => JSON.stringify(data)?.indexOf("切れ者") !== -1 },
  { title: "有選項", func: (data) => data?.choiceList.length > 1 },
  { title: "無選項", func: (data) => data?.choiceList.length <= 1 },
];

const EventList = ({ dataList, idList, onClick, sortFlag = false, type = "all", isNur }) => {
  let sort = null;
  if (sortFlag) {
    sort = {
      data: events,
    };
  }
  if (isNur) {
    sort = {
      data: [events[1], events[0], events[2]],
    };
  }
  const filterFunc =
    type === "multi"
      ? (data) => {
          return data?.choiceList.length > 1;
        }
      : null;
  return (
    <List
      fullWidth
      listKey="events"
      dataList={dataList}
      idList={idList}
      sort={sort}
      filterFunc={filterFunc}
      onClick={onClick}
      className=""
      itemRender={(item, setCur) => (
        <EventCard
          className="mr-1 mb-1"
          data={item}
          onClick={() => (onClick ? onClick(item) : setCur(item))}
        />
      )}
      detailRender={(item) => <EventDetail data={item} isNur={false} />}
    />
  );
};

export default EventList;
