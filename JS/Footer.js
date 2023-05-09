var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://breakvan.github.io/course-work/HTML/lol.html", true);
xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      document.getElementById("myFooter228").innerHTML = this.responseText;
    } else {
      console.error("Failed to load footer: status " + this.status);
    }
  }
};
xhttp.send();
