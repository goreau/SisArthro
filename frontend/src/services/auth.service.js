import axios from "@/services/api.js";
import authHeader from './auth.header.js';

class AuthService {
    login(user) {
       return axios.post("/login", {
          username: user.username,
          password: user.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          } 
    
          return response.data;
        },
        (error) => {
             return error.response.data;
       })
    }

    logout() {
      localStorage.removeItem('user');
    }

    register(data) {
      return axios.post("/user", data)
      .then(response => {
        return response;
      })
    }

    list() {
     /* var headers = authHeader();
      headers['Content-Type'] = "application/json";
      var header = { headers: headers };*/

      return axios.get("/users")
      .then(response => {
        return response.data;
      })
    }

    update(data) {
      return axios.put("/user", data)
      .then(response => {
        return response.data;
      })
    }

    getUserData(id) {
      var headers = authHeader();
      headers['Content-Type'] = "application/json";
      var header = { headers: headers };
      
      return axios.get("/user/" + id, header )
      .then(response => {
        return response;
      })
    }  
    
}

export default new AuthService();