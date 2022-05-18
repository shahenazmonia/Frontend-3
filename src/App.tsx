import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/index.scss";
import { Home } from "./modules/home";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

export const App: FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        {/** this new syntax is for react router v6 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
