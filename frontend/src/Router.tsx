import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import App from './App';
import PreRegister from './pages/PreRegister';
import RegisterForm from './pages/RegisterForm';
import PreSearch from './pages/PreSearch';
import SearchForm from './pages/SearchForm';
import Customers from './pages/Customers';
import CustomersFilter from './pages/CustomersFilter';
import Details from './pages/Details';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/preregister' element={<PreRegister />}></Route>
                <Route path='/register' element={<RegisterForm />}></Route>
                <Route path='/presearch' element={<PreSearch />}></Route>
                <Route path='/search' element={<SearchForm />}></Route>
                <Route path='/customers' element={<Customers />}></Route>
                <Route path='/customersfilter' element={<CustomersFilter />}></Route>
                <Route path='/details' element={<Details />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/privacy' element={<Privacy />}></Route>
                <Route path='/terms' element={<Terms />}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default Router;

//https://cursos.luiztools.com.br/topico/04-react-router-dom/
