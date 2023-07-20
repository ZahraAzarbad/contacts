import { motion } from "framer-motion";
import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  min-width: 150px;
  height: 65px;
  padding-left: 15px;
  position: fixed;
  right: 15px;
  top: 15px;
  color: #0d3d20;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

function Toast({ message }) {
  return (
    <Wrapper as={motion.div} animate={{ x: -20 }}>
      {message}
    </Wrapper>
  );
}

export default Toast;
