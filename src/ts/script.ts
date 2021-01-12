import Sample from "~/lib/Sample";

const name: string = "world";

let hoge = "hogehoge";

const sample = new Sample(name);

document.querySelector(".wrapper").addEventListener("click", () => {
  console.log(`hello, ${sample.name}.`);
});
