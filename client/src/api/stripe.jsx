import axios from "axios";

export const payment = async (token) =>
  await axios.post(
    "http://localhost:5000/api/user/create-payment-intent",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
