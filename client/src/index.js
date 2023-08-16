import React from 'react';
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from "./contexts/UserProvider";
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
<BrowserRouter>
	<UserProvider>
		<App />
	</UserProvider>
</BrowserRouter>
);
