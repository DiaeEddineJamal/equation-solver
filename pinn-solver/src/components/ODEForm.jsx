import React, { useState } from "react";
import Chart from "./Chart";
import "../styles/Form.css";

function ODEForm() {
  const [inputs, setInputs] = useState({
    equation: "x * y",
    x0: 0,
    y0: 1,
    h: 0.01,
    steps: 100,
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSolve = async () => {
    const response = await fetch("http://localhost:8081/api/v1/solver/ode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await response.json();
    setResult(data.data);
  };

  return (
    <div className="form-container">
      <form>
        {Object.keys(inputs).map((key) => (
          <div key={key} className="form-group">
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="button" className="button-solve" onClick={handleSolve}>
          Solve
        </button>
      </form>
      {result && <Chart data={result} />}
    </div>
  );
}

export default ODEForm;
