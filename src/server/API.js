export const API = async ({url, method, isLogin = false, params, token}) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: isLogin ? null : 'Bearer ' + token,
      },
      body: JSON.stringify(params),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
