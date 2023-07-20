import { motion } from "framer-motion";
import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackDrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: #0e0e0ea9;
  z-index: 9;
`;
const Box = styled.div`
  background-color: #0d3d20;
  box-shadow: 0 0 10px #0d0c1d;
  width: 30%;
  color: white;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 15;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 100px;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "contained" ? "#cd3535" : "transparent"};
  border: 1px solid
    ${(props) => (props.variant === "outline" ? "#848181" : "transparent")};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.variant === "contained" ? "#ea4a4a" : "#151b30"};
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
const Question = styled.p`
  font-size: 20px;
  font-weight: bold;
  & strong {
    color: #1a99ee;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;

  font-size: 24px;
  font-weight: bold;
`;

function DeleteModal({ user, onDelete, setIsDelete }) {
  return (
    <Wrapper>
      <BackDrop></BackDrop>
      <Box as={motion.div} animate={{ y: 50 }}>
        <Question>
          مخاطب{" "}
          <strong>
            {user.userName} {user.userLastName}
          </strong>{" "}
          حذف شود؟
        </Question>

        <span className="flex1"></span>
        <ButtonGroup>
          <Button onClick={() => setIsDelete(false)} variant="outline">
            خیر
          </Button>
          <Button onClick={() => onDelete()} variant="contained">
            حذف
          </Button>
        </ButtonGroup>
      </Box>
    </Wrapper>
  );
}

export default DeleteModal;
