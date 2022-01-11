import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  ListGroupItem,
  ListGroup,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { clearAnswer } from "../redux/reducers/question";

const Question = ({ question, streak, setStreak, answered }) => {
  const onClick = (answer) => {
    if (question.answer === answer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      answered(question.id);
      alert(`Correct, streak is now ${newStreak}`);
    } else {
      const finalStreak = streak;
      setStreak(0);
      answered(question.id);
      alert(`Oh No! That was wrong, streak was ${finalStreak}`);
    }
  };
  return (
    <ListGroupItem>
      <Container className="d-flex justify-content-between">
        <Container className="d-flex flex-column">
          <h4>{question.text}</h4>
          <Form>
            <ToggleButtonGroup
              type="radio"
              name="distribution"
              defaultValue={"exponential"}
            >
              <ToggleButton onClick={() => onClick("Fact")}>Fact</ToggleButton>
              <ToggleButton onClick={() => onClick("Fiction")}>
                Fiction
              </ToggleButton>
            </ToggleButtonGroup>
          </Form>
        </Container>
        <ListGroup>
          {question.tags.map((tag) => (
            <ListGroupItem>{tag.name}</ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </ListGroupItem>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatch = (dispatch) => {
  return {
    answered(questionId) {
      dispatch(clearAnswer(questionId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Question);
