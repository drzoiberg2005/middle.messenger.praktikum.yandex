export const generateavatar = (
  object: {
    first_name: string;
    second_name: string;
    title: string;
    avatar: string | null;
  },
  size = 10,
  user = true,
  color = "#ffffff",
  background = "#000000"
) => {
  const text = (
    user ? object.first_name[0] + object.second_name[0] : object.title[0]
  ).toUpperCase();
  const content = () => {
    if (object.avatar && object.avatar !== null) {
      // Delete "!" as I find out how to get an avatar
      const image = document.createElement("img");
      image.setAttribute("src", object.avatar);
      image.style.objectFit = "cover";
      return image;
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = 10 * size;
      canvas.height = 10 * size;
      const context = canvas.getContext("2d");
      if (!context || !(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Failed to get 2D context");
      }

      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = `${size / 2.5}rem Montserrat-regular`;
      context.fillStyle = color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      const image = document.createElement("img");
      image.setAttribute("src", canvas.toDataURL("image/png"));
      return image;
    }
  };

  const avatar = content();
  avatar.style.borderRadius = "50%";
  avatar.style.height = `${size}rem`;
  avatar.style.width = `${size}rem`;
  return avatar;
};
