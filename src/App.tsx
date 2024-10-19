import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/Layout";
import HomeLayout from "@/components/HomeLayout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import PostDetail from "@/pages/PostDetail";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomeLayout>
                  <Home />
                </HomeLayout>
              }
            />

            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/post/edit/:id" element={<Post />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}
