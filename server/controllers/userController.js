import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a User");

  let { email } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email: email } });
  if (!userExist) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User Registered Successfully",
      user: user,
    });
  } else {
    res.status(201).send({
      message: "User already registered",
    });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    // console.log("a");
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    console.log(alreadyBooked);
    
    if (alreadyBooked?.bookedVisits?.some((visit) => visit.id === id)) {
      console.log("c");
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
      console.log("d");
    } else {
      console.log("e");
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      console.log("f");
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const allBookings = asyncHandler(async(req,res)=>{
  const {email} = req.body;
  try {
    const booked = await prisma.user.findUnique({
      where:{email},
      select:{bookedVisits:true}
    })
    res.status(200).send({
      "Bookings":booked.bookedVisits
    })
  } catch (error) {
    throw new Error(error)
  }
})

export const cancelBooking = asyncHandler(async(req,res)=>{
  const {email} = req.body;
  const {id} = req.params;
  try {
    const user = await prisma.user.findUnique({
      where:{email},
      select:{bookedVisits:true}
    })

    const index = user.bookedVisits.findIndex((visit)=> visit.id === id)

    if(index === -1){
      res.status(404).send({
        message:"Booking not Found"
      })
    }else{
      user.bookedVisits.splice(index,1)
      await prisma.user.update({
        where:{email},
        data:{
          bookedVisits:user.bookedVisits
        }
      })
      res.status(200).send({
        message:"Booking successfully deleted"
      })
    }

  } catch (error) {
    throw new Error(error)
  }
})