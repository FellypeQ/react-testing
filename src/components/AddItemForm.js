import React from "react";

const AddItemForm = (props) => {
  // A função "handleChange" controla os inputs do usuário, armazenando as informações que ele coloca no formulário no "inputState".

  function handleChange(event) {
    const { name, value } = event.currentTarget;
    props.setInputState({ ...props.inputState, [name]: value });
  }

  // -------------------------------------------------

  // A função "handleSubmit" pega as informações contidas no "inputState" e as utiliza para criar um objeto no outro state chamado "listState".

  function handleSubmit(event) {
    event.preventDefault();
    props.setListState([
      ...props.listState, // Espalha o "listState" antigo para não sobrescrever com o novo input
      {
        content: props.inputState, // Armazena o "inputState", contendo NOME, QUANTIDADE e CATEGORIA, nesta chave chamada "content"
        completed: false, // Adiciona uma nova chave chamada "completed", cujo único propósito é ter alguma forma de "toggle" nos items da lista. Utilizamos ela para fins de CSS.
        id: (Math.random() * 100).toString(), // Precisavamos de uma string única para utilizar o drag and drop, provavelmente daria pra usar as coisas do backend no lugar disso.
      },
    ]);
    props.setInputState({
      // Após criar o objeto e guarda-lo no "listState", reseta o "inputState" para o valor original, caso contrário o campo permaneceria preenchido no formulário.
      name: "",
      quantity: 1,
      category: "Geladeira",
    });
  }

  console.log(props.inputState);
  console.log(props.listState);
  // -------------------------------------------------

  return (
    <form>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={props.inputState.name}
      />

      <input
        className="mx-5"
        type="number"
        name="quantity"
        min="0"
        max="100"
        onChange={handleChange}
        value={props.inputState.quantity}
      />

      <div>
        <select
          name="category"
          onChange={handleChange}
          value={props.inputState.category}
        >
          <option value="Geladeira">Geladeira</option>
          <option value="Delícias">Delícias</option>
          <option value="Freezer">Freezer</option>
          <option value="Despensa">Despensa</option>
          <option value="Mato">Mato</option>
          <option value="Padaria">Padaria</option>
          <option value="Higiene">Higiene</option>
        </select>
      </div>
      <button className="ml-5" type="submit" onClick={handleSubmit}>
        <i className="fas fa-plus-square"></i>
      </button>
    </form>
  );
};

export default AddItemForm;
