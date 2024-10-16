import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import PostDetail from "@/pages/PostDetail";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/edit/:id" element={<Post />} />
        </Routes>
      </Layout>
    </Router>
  );
}
