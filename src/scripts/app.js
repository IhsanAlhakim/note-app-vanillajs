import { routes } from "./routes/routes.js";

function App() {
  const url = window.location.hash.slice(1) || "/";
  const page = routes[url];
  let app_div = document.getElementById("app");
  app_div.innerHTML = "";
  app_div.innerHTML = page.render();
  page.afterRender();
}

export default App;
