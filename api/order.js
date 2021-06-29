import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logout) {
  try {
    const url = `http://localhost:3001/api/orders/${idUser}`;
    const result = await fetch(url);
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
