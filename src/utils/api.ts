import { merge } from "lodash-es";

const baseUrl = "https://m1.apifoxmock.com/m1/6823977-6537947-default";

const request = async <T = unknown>(
  input: Parameters<typeof fetch>["0"],
  init?: Parameters<typeof fetch>["1"]
) => {
  return fetch(
    input,
    merge(
      {},
      {
        headers: {
          "Content-Type": "application/json",
          apifoxToken: "v0jDZmA67HD_e2HL8dEH2",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      init
    )
  ).then(async (res) => {
    let tmp: unknown = res;

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      tmp = await res.json();
    }

    if (contentType && contentType.includes("text/plain")) {
      tmp = await res.text();
    }

    if (res.status >= 200 && res.status < 300) {
      return tmp as CusomtResponse<T>;
    } else {
      return Promise.reject(tmp);
    }
  });
};

export const login = async <T>(params: {
  userName: string;
  password: string;
}) => {
  return request<T>(`${baseUrl}/auth/login`, {
    method: "post",
    body: JSON.stringify(params),
  });
};

export const getUserInfo = async <T>() => {
  return request<T>(`${baseUrl}/auth/getUserInfo`, {
    method: "get",
  });
};
