import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import Alert from "./components/Alert/index.tsx";

export function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Alert />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/transactions"
                element={
                  <TransactionsProvider>
                    <PrivateRoute>
                      <CategoriesProvider>
                        <Transactions />
                      </CategoriesProvider>
                    </PrivateRoute>
                  </TransactionsProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AlertProvider>
    </AuthProvider>
  )
}

