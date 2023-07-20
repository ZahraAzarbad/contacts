import { motion } from "framer-motion";
import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  gap: 5px;
`;

const Select = styled.select`
  background-color: transparent;
  outline: 0;
  border: 1px solid #3a4971;
  padding: 10px;
  color: #40507c;
  border-radius: 4px;

  transform: translateX(-150px);
  & option {
    background-color: white;
  }
`;

function SelectBox({ delay, value, name, dispatch }) {
  function handleChangeValue(e) {
    dispatch({ type: name, payload: e });
  }

  return (
    <Wrapper
      as={motion.div}
      animate={{ x: 150, opacity: 1 }}
      transition={{ delay: delay, duration: 0.3 }}
    >
      <Select value={value} onChange={(e) => handleChangeValue(e.target.value)}>
        <option value="Frinds">دوست</option>
        <option value="Family">خانواده</option>
        <option value="Coworker">همکار</option>
      </Select>
    </Wrapper>
  );
}

export default SelectBox;
