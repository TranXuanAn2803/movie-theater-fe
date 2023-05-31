import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ListMovie } from "./page/movie/movie";
import { ListCategory } from "./page/category/category";

import { HeaderMenu } from "./component/header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
          <QueryClientProvider client={queryClient}>
            <HeaderMenu />
              <Routes>
                <Route exact path="/" element={<Navigate to="/movie" />} />
                <Route exact path="/movie" element={<ListMovie />} />
                <Route exact path="/category" element={<ListCategory />} />

              </Routes>
        </QueryClientProvider>

  );
}

export default App;
