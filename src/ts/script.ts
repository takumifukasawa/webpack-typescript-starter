import Sample from "~/lib/Sample";

const name = "world";

const sample = new Sample(name);

document.querySelector(".wrapper").addEventListener("click", () => {
  console.log(`hello, ${sample.name}.`);
});
