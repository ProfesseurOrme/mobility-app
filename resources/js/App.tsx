import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppFooter from "./components/Template/AppFooter";
import AppNavbar from "./components/Template/AppNavbar";
import {Container} from "react-bootstrap";
import {webRoutes} from "./router/routes";

const App: React.FunctionComponent = () => {

    return (
        <BrowserRouter>
            <section className={"navigation"}>
                <AppNavbar/>
            </section>
            <section className={"content"}>
                <Container>
                    <Routes>
                        {webRoutes.map(({path, Component}) => (
                            <Route path={path} element={<Component/>} key={path}/>
                        ))}
                    </Routes>
                </Container>
            </section>
            <section className="footer">
                <AppFooter />
            </section>
        </BrowserRouter>
    )
}

export default App;
