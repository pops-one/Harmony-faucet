import app from "./server.js";

// Listen to the App Engine-specified port, or 5000 otherwise
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
