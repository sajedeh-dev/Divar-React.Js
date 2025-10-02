import Router from "router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import defaultOption from "config/reactQuery";
import Layout from "Layouts/Layout";
import { Toaster } from "react-hot-toast";



function App() {
  const queryClient = new QueryClient({ defaultOption })
  return (
    <QueryClientProvider client={queryClient}>


      <BrowserRouter>
        <Layout>
          <Router />
          <Toaster/>
        </Layout>

      </BrowserRouter>
      <ReactQueryDevtools />


    </QueryClientProvider>
  )
}

export default App;
