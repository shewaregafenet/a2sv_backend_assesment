
const routes = require("./routes/auth.js");
const RecipeRoute = require("./routes/recipe.js")



const bodyParser = require('body-parser');


const verifyJWT = require("./middleware/verifyJWT.js")
const checkUserStatus = require("./middleware/userStatus.js")
const seedAdminData = require("./models/auth/seed.js");

dotenv.config({
  path: "./config.env",
});
const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

async function initializeDatabase() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
    seedAdminData();
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}


initializeDatabase();

app.use(cors());
app.use(cookieParser());





// Routes related to Authentication
app.use("/", routes);
app.use(verifyJWT)
app.use(checkUserStatus)


// Routes for ActivateUser
app.use("/recipeRoute",RecipeRoute);

