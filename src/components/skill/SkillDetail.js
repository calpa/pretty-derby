import React, { useEffect, useState } from "react";
import { Typography } from '@material-ui/core'

import db from "../../db.js";
import t from "../t.js";
import SupportList from "../support/SupportList";
import PlayerList from "../player/PlayerList";
import EventList from "../event/EventList";
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const allSupportList = db.get("supports").value();
const allPlayerList = db.get("players").value();

const skillType = {
  1: "速度属性",
  2: "耐力属性",
  3: "力量属性",
  4: "毅力属性",
  5: "智力属性",
  6: "体力",
  7: "体力消耗",
  8: "视野",
  9: "体力恢复",
  10: "出栏时机",
  13: "掛かり时间",
  14: "掛かり结束时间",
  21: "瞬时速度",
  27: "目标速度",
  28: "走位速度",
  31: "加速度",
};
const SkillDetail = (props) => {
  const id = props.id;
  const data = props.data || db.get("skills").find({ id }).value();
  const isNur = props.isNur !== undefined ? props.isNur : parseInt(props.match?.params?.nur);
  const supportList = allSupportList
    .filter((support) => {
      let flag = 0;
      support.skillList.forEach((id) => {
        if (id === data?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity);
  const playerList = allPlayerList
    .filter((player) => {
      let flag = 0;
      player.skillList.forEach((id) => {
        if (id === data?.id) {
          flag = 1;
        }
      });
      return flag;
    })
    .sort((a, b) => b.rarity - a.rarity);

  return data ? (
    <div
      className="w-full flex flex-col p-3"
      style={{
        maxWidth: "calc(100vw - 40px)",
      }}
    >
      <div className="w-full flex mb-1 bg-gray-100 items-center">
        <div className="w-20 flex items-center justify-center">
          <img alt={data.name} src={cdnServer + data.imgUrl} className="w-14" />
        </div>
        <div className="flex-auto">
          <Typography>{t(data.name)}</Typography>
          <Typography className="text-gray-500">{data.name}</Typography>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能描述")}</div>
        <div className="flex-auto">
          <Typography>{t(data.describe)}</Typography>
          <Typography className="text-gray-500">{data.describe}</Typography>
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <div className="w-20 text-center flex-shrink-0">{t("触发条件")}</div>
        <div className="flex-auto">
          <Typography>{t(data.condition)}</Typography>
          <Typography className="text-gray-500">{data.condition}</Typography>
        </div>
      </div>
      <div className="w-full flex mb-1">
        <div className="w-20 text-center flex-shrink-0">{t("技能效果")}</div>
        <div className="flex-auto">
          {data.ability?.map((ability) => {
            return <Typography>{`${skillType[ability.type]} ${ability.value / 10000}`}</Typography>;
          })}
        </div>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <Typography className="w-20 text-center flex-shrink-0">{t("持续时间")}</Typography>
        <Typography className="flex-auto">
          {`${data.ability_time / 10000}s * ${t("赛道长度")} / 1000}`}
        </Typography>
      </div>
      <div className="w-full flex mb-1">
        <Typography className="w-20 text-center flex-shrink-0">{t("冷却时间")}</Typography>
        <Typography className="flex-auto">{`${data.cooldown / 10000}s * ${t("赛道长度")} / 1000`}</Typography>
      </div>
      <div className="w-full flex mb-1 bg-gray-100">
        <Typography className="w-20 text-center flex-shrink-0">{t("技能价格")}</Typography>
        <Typography className="flex-auto">{data.need_skill_point}</Typography>
      </div>
      <div className="w-full flex mb-1">
        <Typography className="w-20 text-center flex-shrink-0">{t("技能评分")}</Typography>
        <Typography className="flex-auto">{data.grade_value}</Typography>
      </div>
      {!isNur && (
        <>
          {supportList.length > 0 && (
            <>
              <div>{t("支援卡")}</div>
              <SupportList className="w-full" dataList={supportList} sortFlag={false} />
            </>
          )}
          {playerList.length > 0 && (
            <>
              <div>{t("角色")}</div>
              <PlayerList className="w-full" dataList={playerList} />
            </>
          )}
          {/* {data.events?.length > 0 && (
            <>
              <div>{t("事件")}</div>
              <EventList className="w-full" idList={data.events} />
            </>
          )} */}
        </>
      )}
    </div>
  ) : null;
};

export default SkillDetail;
