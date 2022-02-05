import { Verify, ValidationFields } from "../layout/block/types";

class Validation {
  private static FIELDS: ValidationFields = {
    first_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      error: "Укажите имя",
    },
    second_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      error: "Укажите фамилию",
    },
    login: {
      pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      error: "Укажите логин",
    },
    email: {
      pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
      error: "Укажите email.",
    },
    password: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      error:
        "Пароль должен быть не менее 8 символов и содержать заглавную букву и цифру",
    },

    phone: {
      pattern: /^[+-d]?\d{10,15}$/,
      error: "Укажите телефон",
    },
  };

  static verify(inputName: string, inputValue: string) {
    const verifyResult: Verify = {
      verify: true,
      message: "",
    };
    const pattern = Validation.FIELDS[inputName]?.pattern;

    if (!pattern) return verifyResult;

    if (!pattern.test(inputValue)) {
      verifyResult.verify = false;
      verifyResult.message = Validation.FIELDS[inputName].error;
    }

    return verifyResult;
  }
}

export default Validation;
