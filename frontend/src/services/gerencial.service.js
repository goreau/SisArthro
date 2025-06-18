import axios from "@/services/api.js";

class GerencialService {
    getCoordenadas(tab) {
        return axios.get(`/getCoordenadas/${tab}`)
        .then(response => {
            return {data: response.data};
        },
        (error) => {
            return error;
        })
    } 

    putCoordenadas(data) {
        return axios.put("/putCoordenadas", data)
        .then(response => {
          return response;
        },
        (error) => {
          return error.response.data;
        })
      }

}

export default new GerencialService();