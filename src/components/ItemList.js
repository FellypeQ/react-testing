import React from "react";
import { Container } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ItemList = (props) => {
  function handleDelete(id) {
    props.setListState(props.listState.filter((el) => el.id !== id));
  }

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
  console.log(props.listState);

  function handleOnDragEnd(result) {
    const items = [...props.listState];
    const [reordedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordedItems);
    props.setListState(items);
  }

  return (
    <Container>
      <DragDropContext onDragEnd={handleOnDragEnd}>
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
                      <button onClick={() => handleCheck(item.id)}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button onClick={() => handleDelete(item.id)}>
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
      </DragDropContext>
    </Container>
  );
};

export default ItemList;
