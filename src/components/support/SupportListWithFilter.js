import React, { useState, useEffect } from "react";
import { useDidRecover } from "react-router-cache-route";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import Button from "@material-tailwind/react/Button";

import dbL from "@/dbL.js";
import db from "@/db.js";
import t from "@/components/t.js";

import SupportList from "@/components/support/SupportList";
import SupportFilterForm from "@/components/support/SupportFilterForm";
import useViewport from '@/utils/useViewport'

const TITLE = "支援 - 乌拉拉大胜利 - 赛马娘资料站";

const allSupports = db.get("supports").value();

document.title = TITLE;
const SupportListWithFilter = (props) => {
  const { onClick, limitHeight } = props;
  const viewport = useViewport()
  const [show, setShow] = React.useState(false);
  const [list, setList] = useState(props.supportList || allSupports || []);
  const [chooseMode, setChooseMode] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [chosenList, setChosenList] = useState(dbL.get("mySupports").value() || []);

  useDidRecover(() => {
    document.title = TITLE;
  });

  const changeChooseMode = () => {
    setShowMode(!showMode);
    setChooseMode(!chooseMode);
  };

  const changeShowMode = () => {
    setShowMode(!showMode);
  };

  const onSelect = (item) => {
    let tmpList = [...chosenList];
    const index = tmpList.indexOf(item.id);
    if (index === -1) {
      tmpList.push(item.id);
    } else {
      tmpList.splice(index, 1);
    }
    dbL.update("mySupports", tmpList).write();
    setChosenList([...tmpList]);
  };

  return (
    <>
      {viewport?.width >= 768
        ? <div className="sticky top-20 hidden md:flex w-1/4 flex-col p-1 overflow-auto"
          style={{
            height: "calc(100vh - 120px)"
          }}
        >
          <Button className='my-1' onClick={changeShowMode} ripple="light" >{t("高亮我的卡组")}</Button>
          <Button className='my-1' onClick={changeChooseMode} ripple="light">{t("配置卡组")}</Button>
          {chooseMode && (
            <Button className='my-1' onClick={changeChooseMode} ripple="light">
              {t("配置完成")}
            </Button>
          )}
          <SupportFilterForm onUpdate={setList} />
        </div>
        : <>
          <Button className='md:hidden fixed top-20 z-40 bg-opacity-80' onClick={() => setShow(true)}>
            筛选
          </Button>
          <Modal
            size={"lg"} active={show} toggler={() => setShow(false)}
          >
            <ModalHeader toggler={() => setShow(false)}>
              {'筛选支援卡'}
            </ModalHeader>
            <ModalBody className='flex flex-col'>
              <SupportFilterForm onUpdate={setList} />
            </ModalBody>
          </Modal>
        </>
      }

      <SupportList
        className={`md:w-3/4 justify-between ${limitHeight && 'h-80vh overflow-auto'}`}
        sortFlag={true}
        dataList={list}
        ownList={showMode ? chosenList : null}
        onClick={chooseMode ? onSelect : onClick}
      />
    </ >
  );
};
export default SupportListWithFilter;
