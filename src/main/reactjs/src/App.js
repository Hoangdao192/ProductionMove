import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "./routes";
import BlankLayout from "./components/Layouts/BlankLayout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	)
}

export default App;
