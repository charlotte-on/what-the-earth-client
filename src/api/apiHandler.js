import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  registerProducer(companyInfo) {
    return service
      .post("/api/companies/signup", companyInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getProducers() {
    return service
      .get("/api/companies/")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateProducer(id, body) {
    return service
      .patch("/api/companies/edit/" + id, body)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneProducer(id) {
    return service
      .get("/api/companies/" + id)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getComments(id) {
    return service
      .get("/api/comments/" + id)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  postComment(comment) {
    return service
      .post("/api/comments/", comment)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteComment(id) {
    return service
      .delete("/api/comments/delete/" + id)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signinProducer(producerInfo) {
    return service
      .post("/api/companies/signin", producerInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/users/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUserPassword(data) {
    return service
      .patch("/api/auth/me/password", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos(userId) {
    return service
      .get(`/api/users/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  createRecipe(datas) {
    return service
      .post("/api/products/simulator", datas)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getResult(id) {
    return service
      .get(`api/products/simulator/result/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
