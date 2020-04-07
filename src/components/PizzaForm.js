import React from "react";

export default function PizzaForm({
  topping,
  size,
  vegetarian,
  submitEdit,
  onChange,
}) {
  return (
    <form className="form-row" onSubmit={submitEdit}>
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          name="topping"
          placeholder="Pizza Topping"
          value={topping}
          onChange={onChange}
        />
      </div>
      <div className="col">
        <select
          value={size}
          className="form-control"
          name="size"
          onChange={onChange}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Vegetarian"
            name="vegetarian"
            checked={vegetarian}
            onChange={onChange}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Not Vegetarian"
            name="vegetarian"
            checked={topping ? (vegetarian ? false : true) : ""}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" disabled={!topping}>
          Submit
        </button>
      </div>
    </form>
  );
}
