import React, { useState } from "react";
import { useHistory } from "react-router";
import { Grid } from '@material-ui/core'

import SupportCard from "./SupportCard";
import SupportDetail from "./SupportDetail";
import List from "../common/List";
import useUa from "../../utils/ua";
const SupportList = ({ className, dataList, onClick, sortFlag = false, ownList }) => {
  const ua = useUa();
  const history = useHistory();
  const sort = sortFlag
    ? {
      key: "rare",
      data: [
        { value: "SSR", title: "SSR" },
        { value: "SR", title: "SR" },
        { value: "R", title: "R" },
      ],
    }
    : null;
  return (
    <List
      className={className}
      listKey="supports"
      dataList={dataList}
      sort={sort}
      onClick={onClick}
      itemRender={(data, setCur) => (
        <Grid className="p-1" item xs={6}>
          <SupportCard
            className={`${ownList?.length && !ownList?.includes(data.id) && "un-chosen-card"}`}
            data={data}
            onClick={() =>
              onClick
                ? onClick(data)
                : ua.isPhone
                  ? history.push(`/support-detail/${data.id}`)
                  : setCur(data)
            }
          />
        </Grid>
      )}
      itemClass={"w-24 max-w-1/4"}
      detailRender={(data) => <SupportDetail data={data} isNur={false} />}
    // detailModalSize='regular'
    />
  );
};

export default SupportList;
