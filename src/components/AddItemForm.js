import React from "react";

const AddItemForm = (props) => {
  function handleChange(event) {
    const { name, value } = event.currentTarget;
    props.setInputState({ ...props.inputState, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.setListState([
      ...props.listState,
      {
        content: props.inputState,
        completed: false,
        id: (Math.random() * 100).toString(),
      },
    ]);
    props.setInputState({
      name: "",
      quantity: 0,
      category: "Geladeira",
    });
  }

  console.log(props.inputState);
  console.log(props.listState);

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
