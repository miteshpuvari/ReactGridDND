import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GridLayout from "react-grid-layout";

import Color from "../../Constant/Color";
import "../Card/Card.css";

const Card = ({ task }) => {
  const [data, setData] = useState(task);
  const [size, setSize] = useState({ with: 200, height: 200 })

  //drag and drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    console.log(result);

    const destid = result.source.droppableId;
    const sid = result.destination.droppableId;
    // const dindex = result.destination.index;
    // const sindex = result.source.index;
    // console.log("source index: ", result.source.index);

    // logic for drag and drop in new task only
    if (sid == "newTask" && destid == "newTask") {
      const items = Array.from(data.newTask);

      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setData({ ...data, newTask: [...items] });
    }

    // logic for drag and drop in working only
    if (sid == "working" && destid == "working") {
      const witem = Array.from(data.working);

      const [reorder] = witem.splice(result.source.index, 1);
      witem.splice(result.destination.index, 0, reorder);

      setData({ ...data, working: [...witem] });
    }

    // logic for drag and drop from working to new only
    if (sid == "newTask" && destid == "working") {
      const drop = Array.from(data.working);
      const drop1 = Array.from(data.newTask);

      const [add] = drop.splice(result.source.index, 1);
      drop1.splice(result.destination.index, 0, add);

      setData({ ...data, working: [...drop], newTask: [...drop1] });

      if (sid == "newTask" && destid == "newTask") {
        const ndrop = Array.from(data.newTask);

        const [nadd] = ndrop.splice(result.source.index, 1);
        ndrop.splice(result.destination.index, 0, nadd);

        setData({ ...data, newTask: [...ndrop] });
      }
    }

    //logic for drop from New task only
    if (sid == "working" && destid == "newTask") {
      const dnewtask = Array.from(data.newTask);
      const dworking = Array.from(data.working);

      const [add1] = dnewtask.splice(result.source.index, 1);
      dworking.splice(result.destination.index, 0, add1);

      setData({ ...data, newTask: [...dnewtask], working: [...dworking] });

      if (sid == "working" && destid == "working") {
        const wdrop = Array.from(data.working);

        const [wadd] = wdrop.splice(result.source.index, 1);
        wdrop.splice(result.destination.index, 0, wadd);

        setData({ ...data, working: [...wdrop] });
      }
    }
  };

  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: true },
    { i: "b", x: 4, y: 0, w: 2, h: 2, },
    { i: "c", x: 1, y: 0, w: 2, h: 2 },
  ];

  return (
    <div className="cardContainer">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={130}
        width={1200}
      >
        <div className="div1" key="a">
          <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <div
                className="cardContainer"
                style={{ background: Color.primary }}
              >
                <h1>New Task</h1>
                <Droppable droppableId="newTask">
                  {(provided) => (
                    <div
                      className="data"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {data.newTask.map(({ id, name }, index) => {
                        return (
                          <Draggable key={id} draggableId={name} index={index}>
                            {(provided) => (
                              <div
                                className="card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div>
                                  <p>{name}</p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                &nbsp;
              </div>

              <div
                className="cardContainer"
                style={{ background: Color.primary }}
              >
                <h1>Working Task</h1>
                <Droppable droppableId="working">
                  {(provided) => (
                    <div
                      className="data"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {data.working.map(({ id, name }, index) => {
                        return (
                          <Draggable key={id} draggableId={name} index={index}>
                            {(provided) => (
                              <div
                                className="card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div>
                                  <p>{name}</p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                &nbsp;
              </div>
            </DragDropContext>
          </div>
        </div>
        <div className="div2" key="b">
          b
        </div>
        <div className="div3" key="c">
          c
        </div>
      </GridLayout>

    </div>
  );
};

export default Card;

