import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goal/goalSlice";

export default function GoalForm() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Please add a textfield"
            type="text"
            name="text"
            id="text"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
