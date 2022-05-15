import { Grid, Typography } from '@material-ui/core';
import { useState } from "react";
import { cdnServer } from "../../config";
import t from "../t.js";
const PlayerCard = (props) => {
  const { data, onClick, className } = props;
  // const [show, setShow] = useState(true);
  return data ? (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    // style={{
    // paddingBottom: "100%",
    // }}
    >
      {/* {show && ( */}
      <img
        // className="absolute top-0"
        style={{ aspectRatio: "32 / 35" }}
        // onError={() => setShow(false)}
        alt={data.name}
        src={process.env.PUBLIC_URL + '/' + data.imgUrl}
        width="80"
      />
      {/* )} */}
      <Grid>
        <Typography className="truncate">{t(data.charaName)}</Typography>
        <Typography className="truncate">{t(data.name)}</Typography>
      </Grid>
    </div>
  ) : null;
};

export default PlayerCard;
