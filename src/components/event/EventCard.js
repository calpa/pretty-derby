import { Typography } from '@material-ui/core'

import t from "../t.js";
const EventCard = (props) => {
  const { data, onClick, className } = props;
  return data ? (
    <Typography
      className={`border border-solid border-gray-700 px-2 rounded truncate cursor-pointer ${className}`}
      onClick={onClick}
      data-tip={`<div>${data.choiceList
        .map(
          (choice, index) =>
            `<div className="w-full flex"><div>${choice[0]}</div><div>------</div>${choice[1]
              .map((result) => `<div>${result}</div>`)
              .join("")}</div>`
        )
        .join("<div>===========</div>")}</div>`}
      style={{
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      {data.name}
    </Typography>
  ) : null;
};

export default EventCard;
