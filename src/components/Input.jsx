import { motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0.1;
  gap: 5px;
  & label {
    margin-left: -25%;
    color: #d6ddef;
    font-size: 14px;
  }
`;
const InputStyle = styled.input`
  background-color: transparent;
  outline: 0;
  border: 1px solid ${(props) => (props.isinvalid ? "#e84747" : "#3a4971")};
  padding: 10px;
  color: white;

  border-radius: 4px;
  &::placeholder {
    color: #40507c;
  }
  transform: translateX(-150px);
`;

const ErrorMessage = styled.small`
  position: absolute;
  font-size: 12px;
  color: #e84747;
  left: -145px;
  bottom: 0;
  opacity: 0;
`;

function Input({
  label = "",
  delay = 0,
  errorMessage = "",
  pattern = "",
  value = "",
  dispatch,
  name,
}) {
  const [isInValid, setIsInvalid] = useState(false);

  function handleChangeValue(e) {
    dispatch({ type: name, payload: e });
    if (isInValid) setIsInvalid(false);
  }

  function handleOnBlur(e) {
    setIsInvalid(e.target.validity.patternMismatch);
  }
  return (
    <Wrapper
      initial={value === ""}
      as={motion.div}
      animate={{ x: 150, opacity: 1 }}
      transition={{ delay: delay, duration: 0.3 }}
    >
      <InputStyle
        isinvalid={isInValid}
        name={label}
        placeholder={` ${label.toLocaleLowerCase()}`}
        value={value}
        onBlur={handleOnBlur}
        pattern={pattern}
        onChange={(e) => handleChangeValue(e.target.value)}
      />

      {isInValid && (
        <ErrorMessage as={motion.small} animate={{ y: 18, opacity: 1 }}>
          {errorMessage}
        </ErrorMessage>
      )}
    </Wrapper>
  );
}

export default Input;
