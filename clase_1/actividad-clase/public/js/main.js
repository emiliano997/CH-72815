const getCookieButton = document.getElementById("get-cookie");

getCookieButton.addEventListener("click", () => {
  fetch("/get-cookie")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cookie").innerText = data.cookie;
    });
});
