import * as userApi from './users-api';



export async function signup(userData){
   // calling the user-api signUp functions
    const token = await userApi.signUp(userData)
    localStorage.setItem('SEItoken',token)
    return getUser()
}

export async function logOut(){
  localStorage.removeItem('SEItoken')
}

export async function checkToken(){
  const dateStr = await userApi.checkToken()
  return new Date(dateStr);
}

export async function login(credentials){
  const token = await userApi.login(credentials)
  localStorage.setItem('SEItoken',token)
  return getUser()
}



export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("SEItoken");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("SEItoken");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}