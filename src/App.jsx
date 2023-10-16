import "./App.css";

function App() {
  return (
    <>
      <form action="">
        <div>
          <label htmlFor="">First name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Phone number</label>
          <input type="tel" />
        </div>
        <input type="submit" value={"Add"} />
      </form>
    </>
  );
}

export default App;
