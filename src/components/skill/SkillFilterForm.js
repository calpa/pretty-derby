import React, { useEffect, useState } from "react";
import Button from "@material-tailwind/react/Button";
import { Grid } from "@material-ui/core"


import db from "../../db.js";
import dbL from "../../dbL.js";

import { useForm } from "react-hook-form";
import CheckBox from "../common/CheckBox";
import Input from "../common/Input";
import t from "../t.js";

const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const allSkillList = db.get("skills").orderBy("db_id").value();

const conditionOptions = [
  // Distnace
  [
    { label: t("短距離"), value: "distance_type==1" },
    { label: t("マイル"), value: "distance_type==2" },
    { label: t("中距離"), value: "distance_type==3" },
    { label: t("長距離"), value: "distance_type==4" },
  ],
  // Running Style
  [
    { label: t("逃げ"), value: "running_style==1" },
    { label: t("先行"), value: "running_style==2" },
    { label: t("差し"), value: "running_style==3" },
    { label: t("追込"), value: "running_style==4" },
    { label: t("通用"), value: "running_style==" },
  ],
  // Phase
  [
    { label: t("序盤"), value: "phase==0|phase_random==0" },
    { label: t("中盤"), value: "phase==1|phase_random==1" },
    { label: t("終盤"), value: "phase==2|phase_random==2" },
    { label: t("冲刺"), value: "phase==3|phase_random==3" },
    { label: t("コーナー"), value: "corner_random==1" },
    { label: t("直線"), value: "straight_random==1" },
    { label: t("最終直線/コーナー"), value: "is_finalcorner==1" },
  ],
];
const typeOptions = [
  { label: "速度被動", value: "10011" },
  { label: "耐力被動", value: "10021" },
  { label: "力量被動", value: "10031" },
  { label: "毅力被動", value: "10041" },
  { label: "智力被動", value: "10051" },
  { label: "耐力恢复", value: "20021" },
  { label: "速度提高", value: "20011" },
  // {label:'20031',value:'20031'},
  { label: "加速度提高", value: "20041" },
  { label: "切换跑道", value: "20051" },
  { label: "起步时间", value: "20061" },
  // {label:'20071',value:'20071'},
  // {label:'20081',value:'20081'},
  { label: "视野提高", value: "20091" },
  { label: "速度降低", value: "30011" },
  { label: "无法冷静", value: "30041" },
  { label: "耐力降低", value: "30051" },
  { label: "视野降低", value: "30071" },
];

const rarityOptions = [
  { label: t("ノーマル"), value: "ノーマル" },
  { label: t("レア"), value: "レア" },
  { label: t("固有"), value: "固有" },
];
const SkillFilterForm = (props) => {
  const { onUpdate, needId, checkOnly, formName = "skill", skillList = [] } = props;

  const { register, watch } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const getFilterList = (value) => {
    debugger;
    const q = value['q']
    const condition =
      value[`${formName}condition`] &&
      value[`${formName}condition`]?.map((e) => e.replace(formName, ""));
    const rare =
      value[`${formName}rare`] && value[`${formName}rare`]?.map((e) => e.replace(formName, ""));
    const type =
      value[`${formName}type`] && value[`${formName}type`]?.map((e) => e.replace(formName, ""));
    if (checkOnly && !q && !type?.length && !rare?.length && !condition?.length) {
      onUpdate([]);
      return;
    }
    let tempList = [...allSkillList];
    if (q) {
      tempList = tempList.filter((item) => item.name.includes(q));
    }
    if (type && type.length) {
      tempList = tempList.filter((skill) => {
        let flag = 0;
        type.forEach((value) => {
          let str = skill.icon_id + "";
          if (str) {
            if (str[0] === value[0] && str[3] === value[3]) {
              flag = 1;
            }
          }
        });
        return flag;
      });
    }
    if (rare && rare.length) {
      tempList = tempList.filter((skill) => {
        let flag = 0;
        rare.forEach((value) => {
          if (skill.rare === value) {
            flag = 1;
          }
        });
        return flag;
      });
    }
    if (condition && condition.length) {
      const str = condition.join("|");
      const reg = RegExp(str);
      tempList = tempList.filter((skill) => skill.condition?.match(reg));
    }
    if (needId) {
      tempList = tempList.reduce((list, skill) => {
        list.push(skill?.id);
        return list;
      }, []);
    }
    // console.log(tempList)
    onUpdate(tempList);
  };
  return (
    <div className="flex flex-wrap">
      <Input register={register} name="q" placeholder={t("輸入關鍵詞")} />
      <Button
        onClick={() => getFilterList({
          q: "",
          skillcondition: [],
          skillrare: false,
          skilltype: ['skill20011'],
        })}
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >重置搜尋</Button>
      <p className="w-full  my-1 text-gray-700">觸發條件</p>
      {conditionOptions.map((list) => (
        <Grid container item xs={12}>
          {list.map(({ label, value }) => (
            <CheckBox
              key={formName + "condition" + value}
              register={register}
              name={formName + "condition"}
              label={label}
              value={formName + value}
            />
          ))}
        </Grid>
      ))}
      <p className="w-full my-1 text-gray-700">類型</p>
      {typeOptions.map(({ label, value }) => (
        <CheckBox
          key={formName + "type" + value}
          register={register}
          name={formName + "type"}
          label={`${label} (${skillList.filter(skill => skill.icon_id === Number(value)).length})`}
          value={formName + value}
          icon={process.env.PUBLIC_URL + '/' + "img/skill_icons/" + value + ".png"}
        />
      ))}
      <p className="w-full  my-1 text-gray-700">稀有度</p>
      {rarityOptions.map(({ label, value }) => (
        <CheckBox
          key={formName + "rare" + value}
          register={register}
          name={formName + "rare"}
          label={label}
          value={formName + value}
        />
      ))}
    </div>
  );
};

export default SkillFilterForm;
