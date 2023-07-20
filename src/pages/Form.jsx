import { styled } from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { add, update } from "../store/index.js";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";

const Wrapper = styled.div`
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  height: 100%;
  min-height: 400px;
  width: 70%;
  border-radius: 10px;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 70%;
  padding-bottom: 5px;
  position: relative;
`;

function reducer(state, action) {
  switch (action.type) {
    case "user/name":
      return { ...state, userName: action.payload };
    case "user/lastName":
      return { ...state, userLastName: action.payload };
    case "user/phone":
      return { ...state, phone: action.payload };
    case "user/related":
      return { ...state, related: action.payload };
    case "user/email":
      return { ...state, email: action.payload };
    case "init":
      return { ...action.payload };
    case "reset":
      return {
        id: 0,
        userName: "",
        userLastName: "",
        phone: "",
        related: "Frinds",
        email: "",
        image: "",
      };
    default:
      throw new Error("Unknown Action Type☠️");
  }
}

function AddMember() {
  const [disabled, setDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [taskMessage, setTaskMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const currentUser = useSelector((state) => state.users.currentUser);

  const [{ id, userName, userLastName, phone, related, email }, dispatch] =
    useReducer(reducer, currentUser);

  const storeDispatch = useDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(id);
    if (id !== 0) {
      storeDispatch(
        update({
          id,
          userName,
          userLastName,
          phone,
          related,
          email,
        })
      );
      setTaskMessage("با موفقیت ویرایش شد");
    } else {
      storeDispatch(
        add({
          id: crypto.randomUUID(),
          userName,
          userLastName,
          phone,
          related,
          email,
        })
      );
      setTaskMessage("با موفقیت اضافه شد");
    }
    dispatch({ type: "reset" });
    setShowToast(true);
  }

  useEffect(() => {
    if (!showToast) return;

    const id = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [showToast]);

  useEffect(() => {
    const result = [userName, userLastName, phone, email].some(
      (item) => item === ""
    );
    if (!result) setIsEmpty(false);
    else setIsEmpty(true);
  }, [userName, userLastName, phone, email]);

  useEffect(() => {
    dispatch({ type: "init", payload: currentUser });
  }, [currentUser]);

  return (
    <Wrapper>
      {showToast &&
        createPortal(<Toast message={taskMessage} />, document.body)}
      <Form onSubmit={handleOnSubmit}>
        <Input
          name="user/name"
          value={userName}
          label="نام"
          dispatch={dispatch}
          pattern="^[A-Za-z0-9\u0600-\u06FF]{3,16}$"
          errorMessage="نام باید حداقل شامل دو حرف باشد"
        />
        <Input
          name="user/lastName"
          value={userLastName}
          dispatch={dispatch}
          label="نام خانوادگی"
          pattern="^[A-Za-z0-9\u0600-\u06FF]{3,16}$"
          errorMessage="نام خانوادگی باید حداقل شامل دو حرف باشد"
          delay={0.1}
        />
        <Input
          name="user/phone"
          value={phone}
          label="شماره تماس"
          pattern="^\d{11}$"
          errorMessage="شماره تماس صحیح نمی باشد"
          dispatch={dispatch}
          delay={0.2}
        />
        <Input
          name="user/email"
          value={email}
          label="ایمیل"
          pattern="^\S+@\S+\.\S+$"
          errorMessage="ایمیل صحیح نمی باشد"
          dispatch={dispatch}
          delay={0.3}
        />
        <SelectBox
          name="user/related"
          value={related}
          label="نسبت"
          dispatch={dispatch}
          delay={0.4}
        />

        <span className="flex1"></span>
        <Button type={isEmpty ? "deactive" : "active"}>
          {id === 0 ? "عضویت" : "ویرایش"}
        </Button>
      </Form>
    </Wrapper>
  );
}

export default AddMember;
