import { Typography } from "@material-ui/core";

const CheckBox = ({ register, name, value, label, icon }) => {
  return (
    <div key={value} className="flex items-center mr-1 mb-1">
      <input
        id={value}
        type="checkbox"
        className={`mt-checkbox mt-checkbox-light-blue-500 hidden overflow-hidden`}
        value={value}
        {...register(name)}
      />
      <label
        htmlFor={value}
        className="flex items-center cursor-pointer select-none transition-all duration-300"
      >
        <span className="relative w-5 h-5 inline-block mr-2 rounded border border-gray-500 transition-all duration-300" />
        {icon && <img alt="" src={icon} width={80} />}
        <Typography>{label}</Typography>
      </label>
    </div>
  );
};
export default CheckBox;
