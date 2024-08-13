import React from "react";
import { Provider } from "react-redux";
import Navigator from "./routes/switchNavigator";
import {store,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
			   <Navigator />
			</PersistGate>
		</Provider>
	);
}
