const express = require("express");
const router = express.Router();
const user = require("../models/users");

router.get("/", (req, res) => {
  res.send("CryptoBank BackEnd Alive...");
});

router.post("/deposit", async (req, res) => {
  const { address, ether, txHash } = req.body;

  console.log("qwerty", address, ether, txHash);

  if (!address || !ether || !txHash)
    return res.status(401).json("Missing field");

  try {
    let IsOldUser = await user.find({ userAddress: address });
    if (IsOldUser[0]) {
      let result = await user.findOneAndUpdate(
        { userAddress: address },
        {
          balance: Number(ether) + Number(IsOldUser[0].balance),
          $push: { txHistory: { Ether: ether, txHash: txHash } },
        }
      );
      if (result) {
        res.status(200).json({
          status: 200,
          Message: "Balance recorded Successfully...",
          data: result,
        });
      }
    } else {
      let newUSer = new user({
        userAddress: address,
        balance: Number(ether),
        txHistory: { Ether: ether, txHash: txHash },
      });
      let result = await newUSer.save();
      if (result) {
        res.status(200).json({
          status: 200,
          Message: "Balance recorded Successfully...",
          data: result,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong...",
      data: err,
    });
  }
});

router.post("/withdraw", async (req, res) => {
  const { address, ether, txHash } = req.body;

  console.log("qwerty", address, ether, txHash);

  if (!address || !ether || !txHash)
    return res.status(401).json("Missing field");

  try {
    let IsUser = await user.find({ userAddress: address });
    if (!IsUser[0])
      return res
        .status(400)
        .json({ status: 400, message: "User Not Found..." });
    let result = await user.findOneAndUpdate(
      { userAddress: address },
      {
        balance: Number(IsUser[0].balance) - Number(ether),
        $push: { txHistory: { Ether: ether, txHash: txHash } },
      }
    );
    if (result) {
      res.status(200).json({
        status: 200,
        Message: "Balance updated Successfully...",
        data: result,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong...",
      data: err,
    });
  }
});

router.post("/getBalance", async (req, res) => {
  const { address } = req.body;

  if (!address) return res.status(401).json("Missing field");

  try {
    let IsUser = await user.find({ userAddress: address });
    if (!IsUser[0])
      return res
        .status(400)
        .json({ status: 400, message: "User Not Found..." });
    let result = await user.findOne({ userAddress: address });
    if (result) {
      res.status(200).json({
        status: 200,
        Message: "Balance updated Successfully...",
        data: result,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong...",
      data: err,
    });
  }
});

module.exports = router;
