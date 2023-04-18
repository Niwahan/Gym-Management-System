import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";

export const createPayment = asyncHandler(async (req, res) => {

  try {
    const member = await Member.findById(req.params.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "service",
      select: "name price",
    });

    const plan = member.plan;
    const pricePerMonth = member.service.price;
    const totalAmount = pricePerMonth * plan;

    const payment = {
      amount: totalAmount,
      date: new Date(),
    };

    member.payment.push(payment);

     const invoice = {
        member: member.user.name,
        email: member.user.email,
        service: member.service.name,
        plan: member.plan,
        pricePerMonth: member.service.price,
        totalAmount: totalAmount,
        date: new Date(),
      };

    await member.save();

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
