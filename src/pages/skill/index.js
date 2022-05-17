import React, { useState } from "react";
import { useDidRecover } from "react-router-cache-route";

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import Button from "@material-tailwind/react/Button";

import db from "@/db.js";
import t from "@/components/t.js";
import SkillList from "@/components/skill/SkillList";
import SkillFilterForm from "@/components/skill/SkillFilterForm";

import useViewport from "@/utils/useViewport";
import { Grid } from '@material-ui/core';

const TITLE = "技能 - 乌拉拉大胜利 - 赛马娘资料站";

document.title = TITLE;
const Skill = (props) => {
  const viewport = useViewport();
  const [show, setShow] = React.useState(false);
  useDidRecover(() => {
    document.title = TITLE;
  });
  // 所有技能列表
  const allSkillList = db.get("skills").orderBy("db_id").value();

  const [skillList, setSkillList] = useState(allSkillList);

  // init supportMode
  localStorage.getItem("supportMode") === null && localStorage.setItem("supportMode", 0);

  return (
    <>
      {viewport?.width >= 768 ? (
        <Grid
          container
          item
          xs={3}
          flexDirection="column"
        >
          <SkillFilterForm onUpdate={setSkillList} skillList={skillList} />
        </Grid>
      ) : (
        <>
          <Button
            className="md:hidden fixed top-20 z-40 bg-opacity-80"
            onClick={() => setShow(true)}
          >
            篩選
          </Button>
          <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
            <ModalHeader toggler={() => setShow(false)}>{"篩選技能"}</ModalHeader>
            <ModalBody className="flex flex-col">
              <SkillFilterForm onUpdate={setSkillList} skillList={skillList} />
            </ModalBody>
          </Modal>
        </>
      )}

      <SkillList className="w-full" dataList={skillList} sortFlag />
    </>
  );
};

export default Skill;
