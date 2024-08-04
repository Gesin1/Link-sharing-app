import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LinkPage from "./layout/LinkPage";
import Login from "./layout/Login";
import CreateAccount from "./layout/CreateAccount";
import ProfilePage from "./layout/ProfilePage";
import PreviewPage from "./layout/PreviewPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/linkPage" element={<LinkPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/previewPage" element={<PreviewPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
