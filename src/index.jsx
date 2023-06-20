import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ToasterContainer from "./components/Toaster";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ToasterContainer />
			<App />
		</Provider>
	</React.StrictMode>
);
