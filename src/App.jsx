import { useRef } from "react";

import "./App.css";

function App() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    const o = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
    };
    console.log(o);
  }

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">First name</label>
          <input ref={firstNameRef} type="text" />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input ref={lastNameRef} type="text" />
        </div>
        <div>
          <label htmlFor="">Phone number</label>
          <input ref={phoneNumberRef} type="tel" />
        </div>
        <input type="submit" value={"Add"} />
      </form>
    </>
  );
}

export default App;
