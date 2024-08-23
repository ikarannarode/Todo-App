import { app } from "./app.js";
import { DatabaseConnection } from "./data/database.js"

DatabaseConnection()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
