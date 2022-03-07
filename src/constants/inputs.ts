import users from "../controllers/users";
import { Event, Props } from "../layout/block/types";

export const addChatForm = [
  {
    label: "Название чата",
    name: "chat-name",
    type: "text",
  },
];

export const addUserForm = [
  {
    label: "Логин пользователя",
    name: "user-login",
    type: "text",
  },
];

export const authForm = [
  {
    label: "Логин",
    name: "login",
    type: "text",
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    suggested: "current-password",
  },
];

export const fileForm = [
  {
    name: "file",
    type: "file",
    className: "input__unit __hide",
    events: {
      change: (e: Event) => {
        const data = new FormData();
        data.append("avatar", e.target?.files[0]);
        users.changeUserAvatar(data);
      },
    },
  },
];

export const registerForm = [
  {
    label: "Имя",
    name: "first_name",
    type: "text",
  },
  {
    label: "Фамилия",
    name: "second_name",
    type: "text",
  },
  {
    label: "Логин",
    name: "login",
    type: "text",
  },
  {
    label: "E-mail",
    name: "email",
    type: "email",
  },
  {
    label: "Телефон",
    name: "phone",
    type: "tel",
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    suggested: "new-password",
  },
];

export const passwordForm = [
  {
    label: "Старый пароль",
    name: "oldPassword",
    type: "password",
    suggested: "current-password",
  },
  {
    label: "Пароль",
    name: "newPassword",
    type: "password",
    suggested: "new-password",
  },
];

export const infoForm = (user: Props) => [
  {
    label: "Имя",
    name: "first_name",
    type: "text",
    value: user ? user.first_name : "",
  },
  {
    label: "Фамилия",
    name: "second_name",
    type: "text",
    value: user ? user.second_name : "",
  },
  {
    label: "Имя в чате",
    name: "display_name",
    type: "text",
    value: user ? user.display_name : "",
  },
  {
    label: "Логин",
    name: "login",
    type: "text",
    value: user ? user.login : "",
  },
  {
    label: "E-mail",
    name: "email",
    type: "email",
    value: user ? user.email : "",
  },
  {
    label: "Телефон",
    name: "phone",
    type: "tel",
    value: user ? user.phone : "",
  },
];
