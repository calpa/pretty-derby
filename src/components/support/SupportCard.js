import { useState } from "react";
import { cdnServer } from "../../config";
import t from "../t.js";
const SupportCard = (props) => {
  const { data, onClick, className } = props;
  // const [show, setShow] = useState(true);
  return data ? (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        paddingBottom: "134%",
      }}
    >
      <div className="absolute inset-1 flex items-center justify-center flex-wrap border-2 border-solid border-gray-500 rounded-lg">
        <p className="">{t(data.charaName)}</p>
        <p className="">{t(data.name)}</p>
      </div>
      {/* {show && ( */}
      <img
        className="absolute top-0"
        // onError={(e) => console.error(e)}
        alt={data.name}
        src={`${process.env.PUBLIC_URL}/${data.imgUrl}`}
        width={"100%"}
      />
      {/* )} */}
    </div>
  ) : null;
};

export default SupportCard;
