interface IReqParams {
  method: string;
  headers: any;
  body: any;
  credentials: RequestCredentials;
}

export default Vue => {
  Vue.prototype.$request = async ({ url, method = "GET", body = null }) => {
    if (body) {
      body = JSON.stringify(body);
    }

    const params: IReqParams = {
      method,
      headers: { "content-type": "application/json" },
      body,
      credentials: "include"
    };

    try {
      const res = await fetch(url, params);
      return await res.json()
    } catch (e) {
      throw e;
    }
  };
};
