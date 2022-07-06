import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import CategiriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    };
    getCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<CategiriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
