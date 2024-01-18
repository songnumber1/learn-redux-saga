import React from "react";
import { Route, Routes } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return (
    <>
      <CounterContainer />

      <Routes>
        <Route path="/" element={<PostListPage />} exact={true} />
        <Route path="/:id" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
