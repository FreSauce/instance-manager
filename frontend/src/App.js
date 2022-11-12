import "./App.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import theme from "./utils/theme";
import Home from "./pages/Home";
import AuthContextProvider from "./contexts/AuthContext";
import PrivateOutlet from "./components/PrivateOutlet";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <AuthContextProvider>
        <NotificationsProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={< PrivateOutlet />}>
                <Route path="" element={<Home />} />
              </Route>
            </Routes>
          </div>
        </NotificationsProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
}

export default App;
