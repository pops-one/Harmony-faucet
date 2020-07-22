import app from "./server.js";
import { port } from "./constants.js";

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
