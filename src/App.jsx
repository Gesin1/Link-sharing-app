import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LinkPage from "./layout/LinkPage";
import Login from "./layout/Login";
import CreateAccount from "./layout/CreateAccount";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/linkPage" element={<LinkPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
