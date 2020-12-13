import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // "inputState" é o state que "controla" os inputs do usuário e os armazena para posteriormente gerar cada item da lista. Nós decidimos começar a quantidade e a categoria em "1" e "geladeira" especificamente para evitar o problema de um produto listado não ter quantidade e/ou categoria. Não conseguimos pensar numa solução para o caso do nome que fizesse sentido. Talvez alguma validação com o Formik.

  const [inputState, setInputState] = useState({
    name: "",
    quantity: 1,
    category: "Geladeira",
  });

  // -------------------------------------------------

  // "listState" é o state que armazena cada item gerado pelo "inputState" num array de objetos, ou seja, sempre que um usuário aperta o submit do componente "AddItemForm" um novo objeto contendo o nome, a quantidade e a categoria do item é adicionado ao array do "listState".

  const [listState, setListState] = useState([]);

  // -------------------------------------------------

  // Ambos states sendo utilizados foram definidos neste componente "pai", app.js, pois precisamos passa-los através de props para 1 dos 2 componentes filhos, o que acreditamos que não seria possível caso os states tivessem sido definidos em componentes "irmãos".

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
