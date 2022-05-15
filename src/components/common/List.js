import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import { Grid, Typography } from '@material-ui/core'

import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import db from "../../db.js";
import t from "../t.js";

const List = (props) => {
  const {
    className,
    listKey,
    sort,
    filterFunc,
    idList,
    dataList,
    itemRender,
    itemClass,
    detailRender,
    // detailModalSize,
    flexDirection,
  } = props
  const [show, setShow] = React.useState(false);
  const list = dataList
    ? dataList
    : idList
      ? idList.reduce((list, cur) => {
        return [...list, db.get(listKey).find({ id: cur }).value()];
      }, [])
      : db.get(listKey).value();
  const [cur, setCur] = useState(null);

  const showModal = (cur) => {
    setCur(cur);
    setShow(true);
  };

  const modal = (
    <Modal size={"lg"} active={show} toggler={() => setShow(false)}>
      <ModalHeader toggler={() => setShow(false)}>{cur?.name}</ModalHeader>
      <ModalBody>{detailRender(cur)}</ModalBody>
    </Modal>
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });
  if (!list) {
    return <></>;
  }
  if (sort) {
    return (
      <Grid className={` flex flex-wrap ${className}`}>
        {sort.data.map((sortItem) => {
          let sortList = list.filter((item) => {
            let flag = false;
            if (sort.key && sortItem.value) {
              flag = item[sort.key] == sortItem.value;
            }
            if (sortItem.func) {
              flag = sortItem.func(item);
            }
            return flag;
          });
          if (!sortList.length) {
            return <></>;
          }
          return (
            <Grid container item xs={4} flexDirection={flexDirection} style={{
              padding: 10,
            }}
              alignContent="baseline"
            >
              <Grid container item xs={12}>
                <Typography variant="h4" component="h2">{t(sortItem.title)}</Typography>
              </Grid>
              {sortList.map((data) => itemRender(data, showModal))}
              {itemClass && (
                <>
                  {[...new Array(20)].map((i) => (
                    <div className={itemClass} />
                  ))}
                </>
              )}
            </Grid>
          );
        })}
        {modal}
      </Grid>
    );
  } else {
    return (
      <Grid className={` flex flex-wrap ${className}`} container flexDirection={flexDirection}>
        {list
          .filter((data) => (filterFunc ? filterFunc(data) : true))
          .map((data) => itemRender(data, showModal))}
        {modal}
      </Grid>
    );
  }
};

export default List;
