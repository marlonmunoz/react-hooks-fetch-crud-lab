import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions , setQuestions] = useState([])


  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then(questions => setQuestions(questions))
  },[]);

  function addNewQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [
          newQuestion.answer1,
          newQuestion.answer2,
          newQuestion.answer3,
          newQuestion.answer4,
        ],
        correctIndex: newQuestion.correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((newQuestion) => setQuestions([...questions, newQuestion]));
  }

function deleteQuestion(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
  .then(() => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  });
}



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm addNewQuestion={addNewQuestion}/> 
      : 
      <QuestionList questions={questions} deleteQuestion={deleteQuestion} />}
    </main>
  );
}

export default App;
