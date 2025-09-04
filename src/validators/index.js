import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is Invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .isLowercase()
      .withMessage("Username must be in Lower Case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("password").trim().notEmpty().withMessage("Password Is Required"),

    body("fullName").optional().trim(),
  ];
};

export { userRegisterValidator };
