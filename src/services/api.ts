// src/services/api.ts
const API_URL = "https://lv9d0stg-4000.use2.devtunnels.ms/api";

const checkResponse = async (response: Response) => {
  let errorMessage = `HTTP Error: ${response.status}`;

  if (!response.ok) {
    try {
      const error = await response.json();
      errorMessage = error?.message || errorMessage;
    } catch (e) {
      console.error("Error al parsear la respuesta de error:", e);
    }
    throw new Error(errorMessage);
  }
};
/**
 * @param endpoint
 * @param data
 * @param token
 */
export const post = async (endpoint: string, data: any, token?: string) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(data),
    });
    await checkResponse(response);
    return await response.json();
  } catch (error) {
    console.error(`Error en POST ${endpoint}:`, error);
    throw error;
  }
};
/**
 * @param endpoint
 * @param params
 * @param token
 */
export const get = async (
  endpoint: string,
  params: Record<string, any> = {},
  token?: string
) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...(token && { Authorization: token }),
      },
    });

    await checkResponse(response);
    return await response.json();
  } catch (error) {
    console.error(`Error en GET ${endpoint}:`, error);
    throw error;
  }
};
/**
 * @param endpoint
 * @param id
 * @param token
 */
export const getById = async (endpoint: string, id: string, token?: string) => {
  try {
    const url = `${API_URL}${endpoint}/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...(token && { Authorization: token }),
      },
      cache: "no-store",
    });
    await checkResponse(response);
    return await response.json();
  } catch (error) {
    console.error(`Error en GET ${endpoint}/${id}:`, error);
    throw error;
  }
};
/**
 * @param endpoint
 * @param id
 * @param data
 * @param token
 */
export const update = async (
  endpoint: string,
  id: string,
  data: any,
  token?: string
) => {
  try {
    const url = `${API_URL}${endpoint}/${id}/`;
    console.log("desde la consulata", token);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(data),
    });
    await checkResponse(response);
    return await response.json();
  } catch (error) {
    console.error(`Error en PUT ${endpoint}/${id}:`, error);
    throw error;
  }
};
/**
 * @param endpoint
 * @param id
 * @param token
 */
export const remove = async (endpoint: string, id: string, token?: string) => {
  try {
    const url = `${API_URL}${endpoint}/${id}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: token }),
      },
    });
    await checkResponse(response);
    return { success: true };
  } catch (error) {
    console.error(`Error en DELETE ${endpoint}/${id}:`, error);
    throw error;
  }
};