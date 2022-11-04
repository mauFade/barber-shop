export default {
  users: {
    expiresIn: "1d",
    secretKey: process.env.SECRET_KEY || "test",
    token_validator: process.env.CUSTOMER_TOKEN_VALIDATOR || "test",
  },
};
