import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles.jsx";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-drop-down/cart-drop-down.component";
import { selectCurrnetUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrnetUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser} className="nav-link">
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sing In
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
