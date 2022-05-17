import { useState } from "react";
import { Divider, Grid, Typography } from "@material-ui/core";

import { cdnServer } from "../../config";
import t from "../t.js";

const SkillCard = (props) => {
  const { data, onClick, className } = props;
  return data ? (
    <Grid
      container
      className={` rounded border-solid border-2  flex items-center cursor-pointer ${
        data.rarity === 2 && "bg-yellow-300"
      } ${className}`}
      onClick={onClick}
      // data-tip={`<div>${t(data.describe)}</div><div>${t(data.condition)}</div>`}
      style={{
        marginBottom: 10,
        padding: 10,
      }}
    >
      <Grid container item xs={12}>
        {/* {show && ( */}
        <img
          className="w-5 h-5 overflow-hidden"
          // onError={() => setShow(false)}
          alt={data.name}
          src={process.env.PUBLIC_URL + "/" + data.imgUrl}
          preview={false}
          style={{
            marginRight: 5,
          }}
        />
        {/* )} */}
        <Typography className="flex-auto truncate">
          {data.name} ({data.grade_value} 分)
        </Typography>
      </Grid>
      <Typography>{t(data.describe)}</Typography>
    </Grid>
  ) : null;
};

export default SkillCard;
