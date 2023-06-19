const mongoose = require("mongoose");
const coinSchema = require("../model/CoinModel");
const { default: axios } = require("axios");
const iconSchema = require("../model/IconModel");
require("dotenv").config();
const Coin = mongoose.model("coins", coinSchema);
const Icon = mongoose.model("icons", iconSchema);

const addAllCoins = async (req, res) => {
  try {
    const response = await axios.get(
      `https://rest.coinapi.io/v1/exchanges?apikey=${process.env.apikey}`
    );
    const coins = response.data;
    console.log(coins);

    const allCoins = await Coin.insertMany(coins);
    if (allCoins) {
      try {
        const response = await axios.get(
          `https://rest.coinapi.io/v1/exchanges/icons/32?apikey=${process.env.apikey}`
        );
        const icons = response.data;
        icons.forEach(async (iconData) => {
          try {
            const addIcons = await Coin.findOneAndUpdate(
              { exchange_id: iconData.exchange_id },
              { $set: { url: iconData.url } },
              { new: true }
            );
            console.log(addIcons);
            console.log(
              `Icon added to document with exchange ID: ${iconData.exchange_id}`
            );
            //   console.log(addIcons);
          } catch (error) {
            console.error(
              `Error updating document with exchange ID: ${iconData.exchange_id}`,
              error
            );
          }
        });
        res.send("Success");
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllCoins = async (req, res) => {
  const PAGE_SIZE = 10;
  const pageNumber = req.query.page || 1;

  const totalDocuments = await Coin.countDocuments({});
  const totalPages = Math.ceil(totalDocuments / PAGE_SIZE);
  const skipDocuments = (pageNumber - 1) * PAGE_SIZE;
  const coins = await Coin.find({}).skip(skipDocuments).limit(PAGE_SIZE).exec();

  res.json({
    coins,
    currentPage: pageNumber,
    totalPages,
  });
};

const searchCoin = async (req, res) => {
  try {
    const item = await Coin.aggregate([
      {
        $search: {
          index: "coin",
          text: {
            query: req.query.text,
            path: ["name", "exchange_id"],
            fuzzy: {
              maxEdits: 1,
              // "prefixLength": 2,
            },
          },
        },
      },
    ]).exec();
    console.log("here", item);
    if (item) {
      res.send (item);
    } else
      res.send ({
        message: "Not Found",
      });
  } catch (error) {
    res.send ({message: error.message })
  }
};

module.exports = { addAllCoins, getAllCoins , searchCoin};
