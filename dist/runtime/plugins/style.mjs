import { defineNuxtPlugin } from "#imports";
const image = (path) => {
  const github = "https://raw.githubusercontent.com/ashtav/assets/master";
  if (path == null) {
    return `background-image: url('${github}/avatar/${Math.floor(Math.random() * 16) + 1}.jpg')`;
  }
  return `background-image: url(${path})`;
};
const style = {
  image
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      style
    }
  };
});
