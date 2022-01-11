import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { fetchQuestions } from "../redux/reducers/question";
import { ListGroup } from "react-bootstrap";

const Questions = ({ getQuestions, questions }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <ListGroup>
      {questions.map((question) => (
        <Question {...{ question, streak, setStreak }} />
      ))}
    </ListGroup>
  );
};

const mapSignup = (state) => {
  const { questions } = state.question;
  return {
    questions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getQuestions() {
      dispatch(fetchQuestions());
    },
  };
};

export default connect(mapSignup, mapDispatch)(Questions);
