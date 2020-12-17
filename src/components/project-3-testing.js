import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import api from "../../apis/api";

import ModalScroll from "../../components/ModalScroll";

function HistoryMarketList() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({ modal: false, product: "" });

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE}/listas-criadas`
        );
        setLists([...response.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchLists();
  }, []);

  const handleClick = (event) => {
    setShow({ modal: true, product: event.currentTarget.name });
  };

  function handleOnDragEnd(result) {
    console.log(result);
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
    const items = Array.from(lists);
    const [reordedItems] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reordedItems);
    setLists(items);
  }

  function renderAccordion() {
    if (loading === false) {
      return (
        <Accordion defaultActiveKey={`${lists.length - 1}`}>
          {lists
            .map((list, idx) => {
              return (
                <Card className="bghistory3" key={idx}>
                  <Card.Header className="bghistory2">
                    <Accordion.Toggle
                      className="linkcolor "
                      as={Button}
                      variant="link"
                      eventKey={`${idx}`}
                    >
                      Lista {`${idx + 1}`}
                    </Accordion.Toggle>

                    <Button
                      as={Link}
                      className="float-right mx-3 btn login text-white"
                      to={`/menus/delete/${list._id}`}
                    >
                      Deletar Lista
                    </Button>
                    <Button
                      as={Link}
                      className="float-right mx-3 btn login text-white"
                      to={`/menus/${list._id}`}
                    >
                      Editar Lista
                    </Button>
                  </Card.Header>
                  <Accordion.Collapse eventKey={`${idx}`}>
                    <Card.Body className="bghistory1">
                      <Droppable droppableId="itemList">
                        {(provided) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <Draggable draggableId="draggable-1" index={0}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p className="font-weight-bold">Despensa</p>
                                  <ul className="removedot">
                                    {list.Lista[0].Despensa.map(
                                      (eachItem, i) => {
                                        return (
                                          <li key={i}>
                                            <button
                                              className="btn btn-lg  btn-danger m-2 login"
                                              onClick={handleClick}
                                              name={eachItem.produto}
                                            >
                                              Imagens do produto
                                            </button>
                                            {eachItem.produto} -{" "}
                                            {eachItem.detalhes}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>

                            <Draggable draggableId="draggable-2" index={1}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p className="font-weight-bold">Freezer</p>
                                  <ul className="removedot">
                                    {list.Lista[1].Freezer.map(
                                      (eachItem, i) => {
                                        return (
                                          <li key={i}>
                                            <button
                                              className="btn btn-lg btn-danger m-2 login"
                                              onClick={handleClick}
                                              name={eachItem.produto}
                                            >
                                              Imagens do produto
                                            </button>
                                            {eachItem.produto} -{" "}
                                            {eachItem.detalhes}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>

                            <Draggable draggableId="draggable-3" index={2}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p className="font-weight-bold">Geladeira</p>
                                  <ul>
                                    {list.Lista[2].Geladeira.map(
                                      (eachItem, i) => {
                                        return (
                                          <li key={i}>
                                            <button
                                              className="btn btn-lg  btn-danger m-2 login"
                                              onClick={handleClick}
                                              name={eachItem.produto}
                                            >
                                              Imagens do produto
                                            </button>
                                            {eachItem.produto} -{" "}
                                            {eachItem.detalhes}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>

                            <Draggable draggableId="draggable-4" index={3}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p className="font-weight-bold">
                                    Frutas e Hortaliças
                                  </p>
                                  <ul className="removedot">
                                    {list.Lista[3]["Frutas e Hortaliças"].map(
                                      (eachItem, i) => {
                                        return (
                                          <li key={i}>
                                            <button
                                              className="btn btn-lg  btn-danger m-2 login"
                                              onClick={handleClick}
                                              name={eachItem.produto}
                                            >
                                              Imagens do produto
                                            </button>
                                            {eachItem.produto} -{" "}
                                            {eachItem.detalhes}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>

                            <Draggable draggableId="draggable-5" index={4}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p className="font-weight-bold">Higiene</p>
                                  <ul className="removedot">
                                    {list.Lista[4].Higiene.map(
                                      (eachItem, i) => {
                                        return (
                                          <li key={i}>
                                            <button
                                              className="btn btn-lg  btn-danger m-2 login"
                                              onClick={handleClick}
                                              name={eachItem.produto}
                                            >
                                              Imagens do produto
                                            </button>
                                            {eachItem.produto} -{" "}
                                            {eachItem.detalhes}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })
            .reverse()}
        </Accordion>
      );
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        {renderAccordion()}
        {show.modal ? (
          <ModalScroll
            infosModal={{
              titulo: "Imagens relacionadas ao produto",
              conteudo: show.product,
            }}
            show={show.modal}
            close={setShow}
          />
        ) : (
          <></>
        )}
      </div>
    </DragDropContext>
  );
}

export default HistoryMarketList;
