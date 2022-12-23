import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "./routes/Routes";
import BlankLayout from "./components/Layouts/BlankLayout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { NextUIProvider, Container } from '@nextui-org/react'
import './App.css';

function App() {
	return (
		<BrowserRouter>
            <NextUIProvider>
            
                    <div className="App">
                            <Routes>
                                    {
                                        publicRoutes.map(
                                            (route, index) => {
                                                const Layout = route.layout || BlankLayout;
                                                const Page = route.component;
                                                return (
                                                    <Route
                                                        key={index}
                                                        path={route.path}
                                                        element={
                                                            <Layout>
                                                                <Page/>
                                                            </Layout>
                                                        }>
                                                    </Route>
                                                );
                                            }
                                        )
                                    }
                                    {
                                        privateRoutes.map(
                                            (route, index) => {
                                                const Layout = route.layout || BlankLayout;
                                                const Page = route.component;
                                                return (
                                                    <Route key={index} path={route.path} element={
                                                        <AuthenticatedRoute>
                                                            <Layout>
                                                                <Page/>
                                                            </Layout>
                                                        </AuthenticatedRoute>}>
                                                    </Route>
                                                );
                                            }
                                        )
                                    }
                            </Routes>
                    </div>
            </NextUIProvider>
		</BrowserRouter>
	)
}

export default App;
