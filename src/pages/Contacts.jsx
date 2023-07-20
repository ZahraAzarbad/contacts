import React from "react";
import { styled } from "styled-components";

import MemberWrapper from "../components/MemberWrapper";
import { initUsers } from "../store/index.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 900px) {
    min-height: 700px;
  }
`;

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("users") || "[]";
    const users = JSON.parse(data);
    dispatch(initUsers(users));
  }, []);

  return (
    <Wrapper>
      <MemberWrapper />
    </Wrapper>
  );
}

export default Main;
