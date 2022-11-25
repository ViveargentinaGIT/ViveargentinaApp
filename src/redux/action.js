//import { isFocusable } from "@testing-library/user-event/dist/utils";
import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_CITIES_BY_NAME = "GET_CITIES_BY_NAME";
export const GET_CITY_BY_ID = "GET_CITY_BY_ID";
export const GET_ALL_CITIES = "GET_ALL_CITIES";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";
export const GET_PACKAGES_BY_NAME = "GET_PACKAGES_BY_NAME";
export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const GET_ALL_EXPERIENCES = "GET_ALL_EXPERIENCES";
export const GET_EXPERIENCES_BY_NAME = "GET_EXPERIENCES_BY_NAME";
export const GET_EXPERIENCE_BY_ID = "GET_EXPERIENCE_BY_ID";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";
export const GET_ALL_REGIONS = "GET_ALL_REGIONS";
export const GET_REGION_BY_ID = "GET_REGION_BY_ID";
export const ORDER_CITIES = "ORDER_CITIES";
export const ORDER_PACKAGES = "ORDER_PACKAGES";
export const ORDER_EXPERIENCES = "ORDER_EXPERIENCES";
export const FILTER_EXPERIENCES = "FILTER_EXPERIENCES";
export const CREATE_NEW_EXPERIENCE = "CREATE_NEW_EXPERIENCE";
export const CREATE_NEW_PACKAGE = "CREATE_NEW_PACKAGE";
export const CREATE_NEW_REVIEW = "CREATE_NEW_REVIEW";
export const UPDATE_EXPERIENCE = "UPDATE_EXPERIENCE";
export const UPDATE_PACKAGE = "UPDATE_PACKAGE";
export const GET_USER_LOGIN = "GET_USER_LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_LS_USER = "GET_LS_USER";
export const REGISTER_USER = "REGISTER_USER";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";
export const BUY_IN_MERCADOPAGO = "BUY_IN_MERCADOPAGO";
export const VERIFY_USER = "VERIFY_USER";
export const CONTACTUS = "CONTACTUS";
export const FILTER_SALES_STATUS = "FILTER_SALES_STATUS";
export const GET_CART_BY_USER = "GET_CART_BY_USER";
export const GET_ALL_SALES = "GET_ALL_SALES";
export const GET_SALES_BY_USER = "GET_SALES_BY_USER";

// Esta ruta manda un mail para solicitar una cancelacion de compra.
export function sendRequestCancelation(saleId, userId) {
  console.log(userId);
  console.log(saleId);
  return async function () {
    let response = await axios.get(
      `https://viveargentina.herokuapp.com/sales/cancel?userId=${userId}&saleId=${saleId}`
    );
    return console.log(response);
  };
}

// Esta ruta trae un array con todas las compras de un usuario.
export function getSalesByUser(userId) {
  console.log(userId);
  return async function (dispatch) {
    let salesByUser = await axios.get(
      `https://viveargentina.herokuapp.com/sales/${userId}`
    );
    return dispatch({
      type: GET_SALES_BY_USER,
      payload: salesByUser.data,
    });
  };
}

//Esta action cambia el estado de una venta de Experiencias
export function updateSaleStatus(newStatus) {
  return async function () {
    let response = await axios.put(
      "https://viveargentina.herokuapp.com/sales",
      newStatus
    );
    console.log(response);
    return;
  };
}

export function approveSaleStatus(token, newStatus) {
  return async function () {
    console.log("token: " + token);
    console.log("newStatus: " + newStatus.status);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let response = await axios.put(
      "https://viveargentina.herokuapp.com/sales/approved",
      newStatus,
      { headers }
    );
    console.log(response.data);
    return response.data;
  };
}

// Esta ruta trae un array con todas las ventas.
export function getAllSales() {
  return async function (dispatch) {
    let allSales = await axios.get(`https://viveargentina.herokuapp.com/sales`);
    return dispatch({
      type: GET_ALL_SALES,
      payload: allSales.data,
    });
  };
}

// Esta ruta añade un una nueva compra con sus items
export function addNewSale(userId, arrayItems) {
  console.log(arrayItems);
  return async function () {
    try {
      let response = await axios.post(
        `https://viveargentina.herokuapp.com/sales?userId=${userId}`,
        arrayItems
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
}

// Esta ruta añade un una nueva compra con sus items
export function addNewCart(userId, arrayItems) {
  return async function () {
    try {
      let response = await axios.post(
        `https://viveargentina.herokuapp.com/cart?userId=${userId}`,
        arrayItems
      );
      return console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
}

// Esta ruta trae el carrito de un usuario por ID
export function getCartByUser(userId) {
  return async function (dispatch) {
    let cartByUser = await axios.get(
      `https://viveargentina.herokuapp.com/cart/${userId}`
    );
    return dispatch({
      type: GET_CART_BY_USER,
      payload: cartByUser.data,
    });
  };
}

export function deleteReview(reviewId) {
  return async function () {
    let response = await axios.delete(
      `https://viveargentina.herokuapp.com/reviews/${reviewId}`
    );
    //console.log('response action deleteReview', response.data);
  };
}

//Filtra las ventas por Status
export function filterSalesStatus(payload) {
  return {
    type: FILTER_SALES_STATUS,
    payload,
  };
}

// Esta ruta trae un array con todo los usuarios.
export function getAllUsers() {
  return async function (dispatch) {
    let allUsers = await axios.get(`https://viveargentina.herokuapp.com/users`);
    return dispatch({
      type: GET_ALL_USERS,
      payload: allUsers.data,
    });
  };
}

// Esta ruta trae un array con todas las reviews.

export function getAllReviews() {
  return async function (dispatch) {
    let allReviews = await axios.get(
      `https://viveargentina.herokuapp.com/reviews`
    );
    return dispatch({
      type: GET_ALL_REVIEWS,
      payload: allReviews.data,
    });
  };
}

// Esta ruta trae un usuario por ID
export function getUserById(userId) {
  return async function (dispatch) {
    let userById = await axios.get(
      `https://viveargentina.herokuapp.com/users/${userId}`
    );
    return dispatch({
      type: GET_USER_BY_ID,
      payload: userById.data,
    });
  };
}

// Esta ruta envía una compra a la pasarela de mercadopago
export function buyInMercadoPago(saleId, itemsFromStore) {
  return async function (dispatch) {
    let response = await axios.post(
      `https://viveargentina.herokuapp.com/mercadopago?saleId=${saleId}`,
      itemsFromStore
    );
    return dispatch({
      type: BUY_IN_MERCADOPAGO,
      payload: response.data,
    });
  };
}

// Esta ruta crea una nueva review
export function createNewReview(newReview) {
  return async function (dispatch) {
    let response = await axios.post(
      "https://viveargentina.herokuapp.com/reviews",
      newReview
    );
    console.log(response.data);
    return dispatch({
      type: CREATE_NEW_REVIEW,
      payload: response.data,
    });
  };
}

//Esta ruta verifica el usuario despues de si registro
export function verifyUser(token) {
  return async function () {
    fetch(`https://viveargentina.herokuapp.com/users/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

//
export function passwordReset({ token, password }) {
  return async function () {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      "https://viveargentina.herokuapp.com/users/password_reset/",
      { password },
      { headers }
    );
    return response.data;
  };
}

//esta funcion envia una solicitud de cambio de contraseña al correo indicado
export function resetPasswordRequest(email) {
  return async function () {
    const response = await axios.post(
      "https://viveargentina.herokuapp.com/users/reset_password_request",
      { email }
    );
    return response.data;
  };
}

//esta funcion cambia la contraseña del usuario logeado. necesita la contraseña actual, la nueva y el accessToken
export function changePassword({ token, password, newPassword }) {
  return async function () {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      "https://viveargentina.herokuapp.com/users/change_password",
      { password, newPassword },
      { headers }
    );
    console.log("response: " + response.data);
    return response.data;
  };
}

export function softDelete({ token, userId }) {
  return async function () {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      "https://viveargentina.herokuapp.com/users/soft_delete",
      { userId },
      { headers }
    );
    console.log("response: " + response);
    return response.data;
  };
}

//esta funcion le cambia la propiedad de administrador a un usuario dependiendo de su estado actual
export function shiftAdmin({ token, userId }) {
  console.log(userId);
  return async function () {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      "https://viveargentina.herokuapp.com/users/shift_admin_authorization",
      { userId },
      { headers }
    );
    console.log("response: " + response);
    return response.data;
  };
}

// Esta ruta añade un paquete a favoritos del usuario
export function addPackageFavorite(packageId, userId) {
  return async function () {
    let response = await axios.post(
      `https://viveargentina.herokuapp.com/favorites/packages?packageId=${packageId}&userId=${userId}`
    );
    console.log(response);
  };
}

// Esta ruta añade una experiencia a favoritos del usuario
export function addExperienceFavorite(experienceId, userId) {
  return async function () {
    let response = await axios.post(
      `https://viveargentina.herokuapp.com/favorites/experiences?userId=${userId}&experienceId=${experienceId}`
    );
    console.log(response);
  };
}

// Esta ruta quita un paquete a favoritos del usuario
export function removePackageFavorite(packageId, userId) {
  return async function () {
    let response = await axios.put(
      `https://viveargentina.herokuapp.com/favorites/packages?userId=${userId}&packageId=${packageId}`
    );
    console.log(response);
  };
}

// Esta ruta quita una experiencia a favoritos del usuario
export function removeExperienceFavorite(experienceId, userId) {
  return async function () {
    let response = await axios.put(
      `https://viveargentina.herokuapp.com/favorites/experiences?userId=${userId}&experienceId=${experienceId}`
    );
    console.log(response);
  };
}

export function registerUser({ first_name, last_name, email, password }) {
  return async function () {
    await axios.post("https://viveargentina.herokuapp.com/users/singin", {
      email,
      password,
      first_name,
      last_name,
    });
  };
}

//Esta funcion envia un correo electronico a vaviveargentina@gmail.com con la info de contactUs
export function contactUs({ name, lastName, email, message }) {
  return async function () {
    console.log({ name, lastName, email, message });
    await fetch(`https://viveargentina.herokuapp.com/contactus/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        email: email,
        message: message,
      }),
    }).then((response) => {
      console.log(response);
    });
  };
}

//funcion para autenticar y obtener informacion del usuario con email + password
export function getUserLogin({ email, password }) {
  return async function (dispatch) {
    let response = await axios.post(
      "https://viveargentina.herokuapp.com/users/login",
      { email, password }
    );
    if (response.data === "Please confirm your email to login") {
      return "Please confirm your email to login";
    }
    if (response.data === "not allowed") {
      return "Incorrect password";
    }
    if (response.data === "This user was deleted") {
      return "User not allowed, please contact the administrator";
    }
    window.localStorage.setItem("user", JSON.stringify(response.data));
    return dispatch({
      type: GET_USER_LOGIN,
      payload: response.data,
    });
  };
}

//esta funcion une el register y el login de un usuario que se use el google login
export function googleLogin({ first_name, last_name, email, password, photo }) {
  return async function (dispatch) {
    console.log("before dispatch");
    const response = await axios.post(
      "https://viveargentina.herokuapp.com/users/google_login",
      { email, password, first_name, last_name, photo }
    );
    console.log(response);
    if (response.data === "This user was deleted") {
      return "User not allowed, please contact the administrator";
    }
    window.localStorage.setItem("user", JSON.stringify(response.data));
    return dispatch({
      type: GOOGLE_LOGIN,
      payload: response.data,
    });
  };
}

//esta funcion revisa si hay informacion en el LocalStorage del usuario y la pasa al reducer
export function getLsUser() {
  return async function (dispatch) {
    let newUser = JSON.parse(window.localStorage.getItem("user"));
    if (!newUser) {
      newUser = {
        accessToken: "",
        auth: false,
        user: {
          experiences: [],
          packages: [],
        },
      };
    }

    return dispatch({
      type: GET_LS_USER,
      payload: newUser,
    });
  };
}

export function getCitiesByName(cityName) {
  return async function (dispatch) {
    let citiesByName = await axios.get(
      `https://viveargentina.herokuapp.com/cities?name=${cityName}`
    );
    return dispatch({
      type: GET_CITIES_BY_NAME,
      payload: citiesByName.data,
    });
  };
}

// Esta ruta trae una ciudad que incluye un array con todos sus paquetes.
// Se pasa el id,tal vez en el city detail
export function getCityById(cityId) {
  return async function (dispatch) {
    let cityById = await axios.get(
      `https://viveargentina.herokuapp.com/cities/${cityId}`
    );
    return dispatch({
      type: GET_CITY_BY_ID,
      payload: cityById.data,
    });
  };
}

// Esta ruta trae un array con todas las ciudades. Creo que se usa en el home
export function getAllCities() {
  return async function (dispatch) {
    let allCities = await axios.get(
      `https://viveargentina.herokuapp.com/cities`
    );
    return dispatch({
      type: GET_ALL_CITIES,
      payload: allCities.data,
    });
  };
}

// Esta ruta trae un array con todos los paquetes. Creo que se usa en el coponente paquetes
export function getAllPackages() {
  return async function (dispatch) {
    let allPackages = await axios.get(
      `https://viveargentina.herokuapp.com/packages`
    );
    return dispatch({
      type: GET_ALL_PACKAGES,
      payload: allPackages.data,
    });
  };
}

// Esta ruta trae un paquete que incluye un array con todas sus experiencias.
// Se pasa el name, tal vez en un searchbar
export function getPackagesByName(packageName) {
  return async function (dispatch) {
    let packagesByName = await axios.get(
      `https://viveargentina.herokuapp.com/packages?name=${packageName}`
    );
    return dispatch({
      type: GET_PACKAGES_BY_NAME,
      payload: packagesByName.data,
    });
  };
}

// Esta ruta trae un paquete que incluye un array con todas sus experiencias.
// Se pasa el id, tal vez en el package detail
export function getPackageById(packageId) {
  return async function (dispatch) {
    let packageById = await axios.get(
      `https://viveargentina.herokuapp.com/packages/${packageId}`
    );
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: packageById.data,
    });
  };
}

// Esta ruta trae un array con todas las experiencias.
export function getAllExperiences() {
  return async function (dispatch) {
    let allExperiences = await axios.get(
      `https://viveargentina.herokuapp.com/experiences`
    );
    return dispatch({
      type: GET_ALL_EXPERIENCES,
      payload: allExperiences.data,
    });
  };
}

// Esta ruta trae una experiencia.
// Se pasa el name, tal vez en un searchbar
export function getExperiencesByName(experienceName) {
  return async function (dispatch) {
    let experiencesByName = await axios.get(
      `https://viveargentina.herokuapp.com/experiences?name=${experienceName}`
    );
    return dispatch({
      type: GET_EXPERIENCES_BY_NAME,
      payload: experiencesByName.data,
    });
  };
}

// Esta ruta trae una experiencia por id.
export function getExperienceById(experienceId) {
  return async function (dispatch) {
    let experienceById = await axios.get(
      `https://viveargentina.herokuapp.com/experiences/${experienceId}`
    );
    return dispatch({
      type: GET_EXPERIENCE_BY_ID,
      payload: experienceById.data,
    });
  };
}

// Esta ruta trae un array con todas las categorias.
export function getAllCategories() {
  return async function (dispatch) {
    let allCategories = await axios.get(
      `https://viveargentina.herokuapp.com/categories`
    );
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: allCategories.data,
    });
  };
}

// Esta ruta trae una categoría que incluye un array con todas sus experiencias.
// Se pasa el id, tal vez se manda de un botón de filtro
export function getCategoryById(categoryId) {
  return async function (dispatch) {
    let categoryById = await axios.get(
      `https://viveargentina.herokuapp.com/categories/${categoryId}`
    );
    return dispatch({
      type: GET_CATEGORY_BY_ID,
      payload: categoryById.data,
    });
  };
}

// Esta ruta trae un array con todas las regiones.
export function getAllRegions() {
  return async function (dispatch) {
    let allRegions = await axios.get(
      `https://viveargentina.herokuapp.com/regions`
    );
    return dispatch({
      type: GET_ALL_REGIONS,
      payload: allRegions.data,
    });
  };
}

// Esta ruta trae una region que incluye un array con todas sus ciudades.
// Se pasa el id, tal vez se manda de un botón de filtro.
export function getRegionById(regionId) {
  return async function (dispatch) {
    let regionById = await axios.get(
      `https://viveargentina.herokuapp.com/regions/${regionId}`
    );
    return dispatch({
      type: GET_REGION_BY_ID,
      payload: regionById.data,
    });
  };
}

export function createNewExperience(newExperience) {
  return async function (dispatch) {
    let newExperienceCreated = await axios.post(
      "https://viveargentina.herokuapp.com/experiences",
      newExperience
    );
    console.log(newExperienceCreated);
    return newExperienceCreated;
  };
}

export function updateExperience(newExperience, id) {
  console.log(newExperience);
  return async function (dispatch) {
    let ExperienceUpdated = await axios.put(
      "https://viveargentina.herokuapp.com/experiences?experienceId=" + id,
      newExperience
    );
    console.log(ExperienceUpdated);
    return ExperienceUpdated;
  };
}

export function createNewPackage(newPackage) {
  console.log(newPackage);
  return async function (dispatch) {
    let newPackageCreated = await axios.post(
      "https://viveargentina.herokuapp.com/packages",
      newPackage
    );
    console.log(newPackageCreated);
    return newPackageCreated;
  };
}

export function updatePackage(newPackage, id) {
  console.log(id);
  return async function (dispatch) {
    let PackageUpdated = await axios.put(
      "https://viveargentina.herokuapp.com/packages?packageId=" + id,
      newPackage
    );
    console.log(PackageUpdated);
    return PackageUpdated;
  };
}

export function orderCities(payload) {
  return {
    type: ORDER_CITIES,
    payload,
  };
}

export function orderPackages(payload) {
  return {
    type: ORDER_PACKAGES,
    payload,
  };
}

export function orderExperiences(payload) {
  return {
    type: ORDER_EXPERIENCES,
    payload,
  };
}

export function filterExperiences(payload) {
  return async function (dispatch) {
    console.log("payload:", payload);
    let filteredExperiences;
    if (payload.categoryId && payload.packageId) {
      const result = await axios.get(
        `https://viveargentina.herokuapp.com/categories/${payload.categoryId}`
      );
      const result2 = result.data.experiences.filter(
        (e) => e.packageId === payload.packageId
      );
      filteredExperiences = result2;
      console.log("1 filteredExperiences:", filteredExperiences);
    } else if (payload.categoryId) {
      const result = await axios.get(
        `https://viveargentina.herokuapp.com/categories/${payload.categoryId}`
      );
      filteredExperiences = result.data.experiences;
      console.log("2 filteredExperiences:", filteredExperiences);
    } else if (payload.packageId) {
      const result = await axios.get(
        `https://viveargentina.herokuapp.com/packages/${payload.packageId}`
      );
      filteredExperiences = result.data.experiences;
      console.log("3 filteredExperiences:", filteredExperiences);
    } else {
      const result = await axios.get(
        `https://viveargentina.herokuapp.com/experiences`
      );
      filteredExperiences = result.data;
      console.log("4 filteredExperiences:", filteredExperiences);
    }

    return dispatch({
      type: FILTER_EXPERIENCES,
      payload: filteredExperiences,
    });
  };
}

export function logout() {
  return async function (dispatch) {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("items");
    return dispatch({
      type: LOGOUT,
      payload: null,
    });
  };
}
