import "./categories.styles.scss";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";

const Shop = () => {
  return <h1>I am the shop Page!</h1>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>

  );
};

export default App;
