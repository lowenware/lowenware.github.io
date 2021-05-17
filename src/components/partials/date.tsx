import React from "react";
import { format } from "date-fns";

interface IProps {
  date: string,
}

const FormattedDate: React.FC<IProps> = (props) => {
  const date = format(new Date(props.date), "MMMM dd, yyyy"); // January 02, 2006

  return (
    <>{date}</>
  );
};

export default FormattedDate;
