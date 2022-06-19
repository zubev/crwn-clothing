import { Routes, Route } from 'react-router-dom';
import CategiriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategiriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
