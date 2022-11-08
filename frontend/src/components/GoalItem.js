import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goal/goalSlice";

export default function GoalItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>{new Date(item.createdAt).toLocaleString("tr-TR")}</div>
      <h2>{item.text}</h2>
      <button onClick={() => dispatch(deleteGoal(item._id))} className="close">
        x
      </button>
    </div>
  );
}
