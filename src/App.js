import React, { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import { Container } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [inputState, setInputState] = useState({
    name: "",
    quantity: 0,
    category: "Geladeira",
  });

  const [listState, setListState] = useState([]);

  return (
    <Container className="my-5">
      <AddItemForm
        inputState={inputState}
        setInputState={setInputState}
        listState={listState}
        setListState={setListState}
      />
      <ItemList listState={listState} setListState={setListState} />
    </Container>
  );
}

export default App;
