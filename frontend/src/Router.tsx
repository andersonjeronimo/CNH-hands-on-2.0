import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import JSX from 'react';

import App from './App';
import RegisterForm from './pages/RegisterForm';
import RegisterResult from './pages/RegisterResult';
import SearchForm from './pages/SearchForm';
import SearchResult from './pages/SearchResult';
import Customers from './pages/Customers';
import CustomerDetails from './pages/CustomerDetails';
import Details from './pages/Details';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Faq from './pages/Faq';

function Router() {

    type Props = {
        children: JSX.ReactElement;
    }

    //implementar login
    function PrivateRoute({ children }: Props) {
        const isAuth = false;
        return isAuth ? children : <Navigate to="/" />

    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<App />} />                
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/register-result' element={<RegisterResult />} />
                <Route path='/search' element={<SearchForm />} />
                <Route path='/search-result' element={<SearchResult />} />
                
                {/* rota de listagem de instrutores deve ser privada */}
                <Route path='/customers' element={
                    <PrivateRoute>
                        <Customers />
                    </PrivateRoute>
                } />
                
                <Route path='/customersfilter' element={<CustomerDetails />}></Route>
                <Route path='/details' element={<Details />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/privacy' element={<Privacy />}></Route>
                <Route path='/terms' element={<Terms />}></Route>
                <Route path='/faq' element={<Faq />}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default Router;