const Order = require("../models/order.model");
// const User = require("../models/user");

exports.getAllOrders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.status(200).json(allOrders);
};

exports.changeOrderStatus = async (req, res) => {
  // console.log(req.body);
  // return;
  
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
