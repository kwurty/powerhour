import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_URL;

class AuthService {
  login(username: String, password: String) {
    return axios
      .post(`${API_URL}/login`, {
        username,
        password,
      })
      .then((response) => {
        // probably add in refresh token here as well.
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username: String, password: String, email: String) {
    return axios.post(`${API_URL}/register`);
  }
  getCurrentUser() {
    if (localStorage.getItem("user")) {
      return axios.post(`${API_URL}/refreshlogin`, {});
    }
  }
}

export default new AuthService();
