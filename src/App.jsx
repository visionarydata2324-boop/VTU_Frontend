import App_Routes from "./routes/App_Routes";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signOutUserSuccess } from "./store/userReducers";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { existingUser } = useSelector((state) => state.user);

  
  useEffect(() => {
    if (existingUser?.token) {
      try {
        const decoded = jwtDecode(existingUser.token);

        // check expiry (exp is in seconds → convert to ms)
        if (decoded.exp * 1000 < Date.now()) {
          dispatch(signOutUserSuccess());
          window.location.href = "/login"; // redirect user
        }
      } catch (err) {
        dispatch(signOutUserSuccess()); // ✅ fallback logout
        window.location.href = "/login";
      }
    }
  }, [existingUser, dispatch]);

  return <App_Routes />;
}

export default App;
