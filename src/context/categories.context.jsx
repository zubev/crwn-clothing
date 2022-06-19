import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data'
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };
  useEffect(() => {

    const getegoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments()
        setCategoriesMap(categoryMap)
    }
    getegoriesMap()
  }, []);
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}