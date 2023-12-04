import contentRoute from "./routes/contentsRoute.js"
import pageRoute from "./routes/pageRoute.js"
import blogRoute from "./routes/blogRoute.js"
import faqRoute from "./routes/faqRoute.js"
import faqCategoryRoute from "./routes/faqCategoryRoute.js"
import courseroute from "./routes/courseroute.js"
import UserRoleRoute from "./routes/userRoleRoute.js"
import UserRoute from "./routes/userRoute.js"
import errorHandler from "./utils/errorHandler.js"
import LocationRoute from "./routes/locationRoute.js"
import OfficeRoute from "./routes/officeRoute.js"


const routersFunction = (app) => {
    app.use("/api/v1/content",contentRoute)
    app.use("/api/v1/blog",blogRoute)
    app.use("/api/v1/faqroute",faqRoute)
    app.use("/api/v1/faqcategoryroute",faqCategoryRoute)
    app.use("/api/v1/courseroute",courseroute)
    app.use("/api/v1/user-role",UserRoleRoute)
    app.use("/api/v1/user",UserRoute)
    app.use("/api/v1/location",LocationRoute)
    app.use("/api/v1/office",OfficeRoute)

    app.use("/api/v1/page",pageRoute)
    app.use(errorHandler)
}
export default routersFunction;
