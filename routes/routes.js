const { addAllCoins, getAllCoins, searchCoin} = require("../controller/exchangeController")


const routes = (app) => {
    
    app.route('/coins')
    .post(addAllCoins)
    app.route('/coins')
    .get(getAllCoins)
    app.route('/search')
    .get(searchCoin)

}
module.exports = routes
