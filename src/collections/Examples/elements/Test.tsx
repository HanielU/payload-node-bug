import { useField } from "payload/components/forms";
// import "./index.scss";
import React, { useRef, useState } from "react";
type Props = { status: string };

const CustomTextField: React.FC<Props> = () => {
  const { value, setValue } = useField<Props>({
    path: "status"
  });

  return (
    <input onChange={e => setValue(e.target.value)} value={value?.status} />
  );
};

export default CustomTextField;
