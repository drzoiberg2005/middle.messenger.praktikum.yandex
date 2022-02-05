import { Verify, FormData } from "../layout/block/types";
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

const formSubmit = (e: Event): void => {
  e.preventDefault();
  const data: FormData = {};
  const target = e.currentTarget;
  console.log(target);
  const inputFields = (target as HTMLElement).querySelectorAll("input");
  let validationError: string = "";
  inputFields?.forEach((input: HTMLInputElement) => {
    const { verify, message } = Validation.verify(input.name, input.value);
    if (!verify) validationError = message;
    data[input.name] = input.value;
  });

  if (validationError.length === 0) {
    console.log("Данные формы", data);
  }
};

const toggleErrorElement = (
  input: HTMLInputElement,
  verifyResult: Verify
): void => {
  if (!verifyResult.verify) {
    input.classList.add("__error");
    const warning = document.body.querySelector(
      ".form__warning-message"
    ) as HTMLElement;
    if (warning) {
      warning.innerText = verifyResult.message;
    }
  }
};
export { inputFocus, inputBlur, formSubmit };
