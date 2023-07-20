import React from "react";
import Member from "./Member";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  margin-top: 100px;
  flex: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(10, minmax(220px, 300px));
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MemberWrapper() {
  const state = useSelector((state) => state.users);
  const users = state.users;
  const type = state.type;
  const search = state.search;

  const filteredUser = users.filter((user) => {
    return (
      (type === "all" ? true : user.related.toLowerCase() === type) &&
      (search === ""
        ? true
        : user.userName.includes(search) || user.userLastName.includes(search))
    );
  });

  return (
    <Wrapper>
      {filteredUser.map((user, idx) => (
        <Member key={user.id} delay={`.${idx}`} user={user} />
      ))}
    </Wrapper>
  );
}

export default MemberWrapper;
