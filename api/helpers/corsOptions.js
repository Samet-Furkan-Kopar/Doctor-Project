//Backende nereden istek gelecegini belirliyoruz
const whiteList = ["http://localhost:3000", "http://localhost:5173"]
const corsOptions = (req, callback) => {
    let same
    if (whiteList.indexOf(req.header("Origin") !== -1)) {
        same = {
            origin: true
        }
    } else {
        same = {
            origin: false
        }
    }
    callback(null, same);
}
export default corsOptions