import React, { useState } from "react";
import Chart from "./Chart";
import "../styles/Form.css";

function PDEForm() {
  const [inputs, setInputs] = useState({
    alpha: 0.1,
    L: 1,
    T: 1,
    dx: 0.01,
    dt: 0.0001,
    initialCondition: "Math.sin(Math.PI * x)",
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSolve = async () => {
    const response = await fetch("http://localhost:8082/api/v1/solver/pde", {
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

export default PDEForm;
