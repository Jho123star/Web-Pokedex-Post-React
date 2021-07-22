import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ListPage from './pages/ListPage/ListPage';
import { Fragment } from 'react';
import NavBar from './components/NavBar/NavBar';
import BackToTopBtn from './components/BackToTopBtn/BackToTopBtn';
import DetailPage from './pages/DetailPage/DetailPage';
import SearchPage from './pages/SearchPage/SearchPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route path="/detail/:pokeName">
            <DetailPage></DetailPage>
          </Route>
          <Route path="/search/:query">
            <SearchPage></SearchPage>
          </Route>
          <Route path="/favorites">
            <FavoritePage></FavoritePage>
          </Route>
          <Route path="/">
            <ListPage></ListPage>
          </Route>
        </Switch>
        <BackToTopBtn></BackToTopBtn>
      </BrowserRouter>
    </Fragment>
    
  );
}

export default App;
