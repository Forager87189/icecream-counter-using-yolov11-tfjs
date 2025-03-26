import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Main from "/src/pages/main";
import Start from "/src/pages/start";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/yolov11-tfjs' element={<Start />} />
        <Route path='/yolov11-tfjs/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}