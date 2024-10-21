import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "tailwindcss/tailwind.css";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AuthProvider from "react-auth-kit/AuthProvider";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/Auth/store.js";
import { storeRedux, persistor } from "./store/index.js";

export const ThemedApp = () => {
  return (
    <Theme>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <Provider store={storeRedux}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <ThemedApp />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </AuthProvider>
);
