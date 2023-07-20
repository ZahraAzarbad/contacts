import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setCurrentUser, remove } from "../store/index.js";
import DeleteModal from "./DeleteModal.jsx";
import { createPortal } from "react-dom";
const Wrapper = styled.div`
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  width: 100%;
  border-radius: 10px;
  margin-top: 200px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  overflow: hidden;
  color: #0d3d20;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  font-size: 24px;
  color: #0d3d20;
`;

const Email = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #0d3d20;
  margin-left: 10px;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #556486;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0d3d20;
`;
const FooterIconWrapper = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 4px;

  &:hover {
    background-color: #83e1a9;
  }
`;

function Member({ delay = 0, user }) {
  const storeDispatch = useDispatch();

  const [isDelete, setIsDelete] = useState(false);

  function handleRemoveUser() {
    storeDispatch(remove({ id: user.id }));
  }

  function handleClickDelete() {
    setIsDelete((s) => !s);
  }

  return (
    <Wrapper
      as={motion.div}
      animate={{ marginTop: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {isDelete &&
        createPortal(
          <DeleteModal
            onDelete={handleRemoveUser}
            setIsDelete={setIsDelete}
            user={user}
          />,
          document.body
        )}

      <CardHeader>
        <TextWrapper>
          <p>
            {user.userName} {user.userLastName}
          </p>
        </TextWrapper>
        <CardFooter>
          <span className="flex1"></span>

          <FooterIconWrapper onClick={handleClickDelete}>
            <i class="bi bi-trash3-fill"></i>
          </FooterIconWrapper>
          <FooterIconWrapper
            onClick={() => storeDispatch(setCurrentUser(user))}
          >
            <i className="bi bi-pencil-square"></i>
          </FooterIconWrapper>
        </CardFooter>
      </CardHeader>
      <Line></Line>
      <Email>
        <i className="bi bi-envelope-paper-fill"></i>
        <p>{user.email}</p>
      </Email>
      <Email>
        <i class="bi bi-telephone-fill"></i>
        <p>{user.phone}</p>
      </Email>
      <Email>
        <i class="bi bi-person-circle"></i>
        <p>{user.related}</p>
      </Email>
    </Wrapper>
  );
}

export default Member;
