import { app } from "./settings";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`blog-app-back app listening on port ${port}`);
});
