import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Draggable() {
  const [leftColumn, setLeftColumn] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" }
  ]);

  const [rightColumn, setRightColumn] = useState([
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
    { id: 6, text: "Item 6" }
  ]);

  const onDragStart = (e, sourceColumn, sourceIndex) => {
    e.dataTransfer.setData("sourceColumn", sourceColumn);
    e.dataTransfer.setData("sourceIndex", sourceIndex);
  };

  const onDrop = (e, targetColumn) => {
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    const sourceIndex = e.dataTransfer.getData("sourceIndex");
    let items;
    if (sourceColumn === "left") {
      items = [...leftColumn];
      setLeftColumn(
        items.filter((_, index) => index !== parseInt(sourceIndex))
      );
    } else {
      items = [...rightColumn];
      setRightColumn(
        items.filter((_, index) => index !== parseInt(sourceIndex))
      );
    }
    if (targetColumn === "left") {
      setLeftColumn([...leftColumn, items[sourceIndex]]);
    } else {
      setRightColumn([...rightColumn, items[sourceIndex]]);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Column 1</h3>
          {leftColumn.map((item, index) => (
            <Card
              key={item.id}
              style={{ width: "18rem", margin: "10px" }}
              onDragStart={e => onDragStart(e, "left", index)}
              draggable
            >
              <Card.Body>
                <Card.Title>{item.text}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <h3>Column 2</h3>
          {rightColumn.map((item, index) => (
            <Card
              key={item.id}
              style={{ width: "18rem", margin: "10px" }}
              onDragStart={e => onDragStart(e, "right", index)}
              draggable
            >
              <Card.Body>
                <Card.Title>{item.text}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Draggable;
