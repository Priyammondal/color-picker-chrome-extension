const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || []);

const clearAllColor = () => {
  pickedColors = [];
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  showColors();
  document.querySelector(".picked-colors").classList.add("hide");
};

const copyColor = (elem) => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerHTML = "Copied";
  setTimeout(() => (elem.innerHTML = elem.dataset.color), 1000);
};

const showColors = () => {
  if (pickedColors.length == 0) {
    return;
  }
  colorList.innerHTML = pickedColors
    .map(
      (color) => `
    <li class="color">
        <span class="rect" style="background-color: ${color}; border: 1px solid ${
        color === "#ffffff" ? "#ccc" : color
      }"></span>
        <span class="va#E3F2FD
        lue" data-color="${color}">${color}</span>
    </li>
    `
    )
    .join("");
  document.querySelector(".picked-colors").classList.remove("hide");

  document.querySelectorAll(".color").forEach((li) => {
    li.addEventListener("click", (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });
};

showColors();

const activateEyeDropper = async () => {
  try {
    const eye = new EyeDropper();
    const { sRGBHex } = await eye.open();
    navigator.clipboard.writeText(sRGBHex);
    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    }
    showColors();
  } catch (err) {
    console.log("error: ", err);
  }
};

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColor);
