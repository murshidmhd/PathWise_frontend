export const Login = () => {
  const login = (token, role) => {
    setAccessToken(token); // axios
    dispatch(setUser({ token, role })); // redux
    localStorage.setItem("role", role); // localStorage
  };
};
