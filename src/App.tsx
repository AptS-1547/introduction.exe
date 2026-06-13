import { BrowserRouter } from "react-router";
import { AppShell } from "./components/AppShell";
import { I18nProvider } from "./i18n/I18nProvider";

function App() {
	return (
		<I18nProvider>
			<BrowserRouter>
				<AppShell />
			</BrowserRouter>
		</I18nProvider>
	);
}

export default App;
