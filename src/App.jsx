import React, { useState } from "react";
import Table from "./components/Table/Table";
import TodosList from "./components/Todos/TodosList";

function App() {
  const [animals] = useState([
    { type: `turtle`, icon: `🐢` },
    { type: `octopus`, icon: `🐙` },
    { type: `fish`, icon: `🐠` },
    { type: `flamingo`, icon: `🦩` },
    { type: `penguin`, icon: `🐧` },
  ]);

  return (
    <>
      
      <TodosList/>
      {/* <Table list={animals} /> */}
    </>
  );
}

export default App;
