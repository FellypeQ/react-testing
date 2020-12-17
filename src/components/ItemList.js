import React from "react";
import { Container } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ItemList = (props) => {
  // A função handleDelete utiliza o método filter de uma forma bem comum para "retirar" um único item do array do "listState" fazendo um simples teste: Se o ID do elemento atual é diferente do ID do elemento a ser deletado. Como os IDs são únicos, todos eles são diferentes do elemento a ser deletado, então o método filter cria um novo array com todos os elementos que passaram do teste, ou seja, todos menos o que tinha o ID igual.

  function handleDelete(id) {
    props.setListState(props.listState.filter((el) => el.id !== id));
  }

  // -------------------------------------------------

  // A função handleCheck serve para "ticar" um item da lista, ou seja, criar uma referência visual de que o item já foi comprado. Para fazer isso ela simplesmente inverte o valor boolean da chave "completed" do item em questão e, posteriormente no render uma classe de CSS é inserida em função desse toggle.

  function handleCheck(id) {
    props.setListState(
      props.listState.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed };
        }
        return el;
      })
    );
  }

  // -------------------------------------------------

  // A função handleOnDragEnd é uma função auxiliar da biblioteca que permite o Drag and Drop. Basicamente ela utiliza o método splice para reorganizar o índice dos elementos no array, ou seja, ela faz a parte "programática" do aspecto visual de arrastar um elemento do array para outro lugar.

  function handleOnDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const items = [...props.listState];
    const [reordedItems] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reordedItems);
    props.setListState(items);
  }

  // Dentro do render existem 3 componentes (DragDropContext, Droppable e Draggable) da biblioteca que servem para delimitar a área em que os elementos poderão ser largados, bem como quais elementos poderão ser arrastados.

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        <Droppable droppableId="itemList">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {props.listState.map((item, idx) => (
                <Draggable key={item.id} draggableId={item.id} index={idx}>
                  {(provided) => (
                    <div
                      className="text-center border border-primary my-3"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <li
                        className={`mx-3 my-4 ${
                          item.completed ? "checked" : ""
                        }`}
                      >
                        {item.content.name} - {item.content.quantity} -{" "}
                        {item.content.category}
                      </li>
                      <button
                        className="mx-1"
                        onClick={() => handleCheck(item.id)}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button
                        className="mx-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
};

export default ItemList;
