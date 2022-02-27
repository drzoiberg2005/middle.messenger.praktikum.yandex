import users from "../controllers/users";
import auth from "../controllers/auth";
import { Verify, FormData } from "../layout/block/types";
import router from "./router";
import Validation from "./validation";

const inputFocus = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  input.classList.remove("__error");
};

const inputBlur = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const verifyResult = Validation.verify(input.name, input.value);
  toggleErrorElement(input, verifyResult);
};

const formCheck = (e: Event) => {
  const data: FormData = {};
  const target = e.currentTarget;
  const inputFields = (target as HTMLElement).querySelectorAll("input");
  let validationError: string = "";
  inputFields?.forEach((input: HTMLInputElement) => {
    const { verify, message } = Validation.verify(input.name, input.value);
    if (!verify) validationError = message;
    data[input.name] = input.value;
  });
  if (validationError.length === 0) {
    return data;
  }
  return null;
};

const toggleErrorElement = (
  input: HTMLInputElement,
  verifyResult: Verify
): void => {
  if (!verifyResult.verify) {
    input.classList.add("__error");
    const form = input.parentNode?.parentNode?.parentNode
    const warning = form?.querySelector(
      ".form__warning-message"
    ) as HTMLElement;
    if (warning) {
      warning.innerText = verifyResult.message;
    }
  }
};

const signIn = (e: Event) => {
  e.preventDefault();
  const data = formCheck(e);
  if (data) {
    auth.signIn(data);
  }
};

const signUp = (e: Event) => {
  e.preventDefault();
  const data = formCheck(e);
  if (data) {
    auth.signUp(data);
  }
};

const changeUserData = (e: Event) => {
  e.preventDefault();
  const data = formCheck(e);
  if (data) {
    users.changeUserProfile(data);
  }
};

const changePassword = (e: Event) => {
  e.preventDefault();
  const data = formCheck(e);
  if (data) {
    users.changeUserPassword(data);
  }
};

const logOut = (e: Event) => {
  e.preventDefault();
  auth.logout();
  router.go("/");
};

const goProfile = (e: Event): void => {
  if (
    // eslint-disable-next-line no-constant-condition
    (e.target as HTMLElement).className === "header__user-name" ||
    "header__user-avatar"
  ) {
    router.go("/settings");
  }
};

export {
  inputFocus,
  inputBlur,
  signIn,
  signUp,
  logOut,
  goProfile,
  changeUserData,
  changePassword,
};
