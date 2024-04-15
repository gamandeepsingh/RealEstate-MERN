import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

//   console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(error.message);
  }
});

export const getAllResidencies = asyncHandler(async(req,res)=>{
    try {
        const data = await prisma.residency.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })  
        res.send({
            residencies:data
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const getResidency = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const residency = await prisma.residency.findUnique({where:{id}})

        res.send(residency)
    } catch (error) {
        res.status(404).send({
            message:error.message
        })
    }
})

export const favouriteResidency = asyncHandler(async(req,res)=>{
  const {email} =req.body;
  const {id} = req.params;

  try {
    const user = await prisma.user.findUnique({
      where:{email}
    })
    if(user.favResidenciesID.includes(id)){
      const updatedUser = await prisma.user.update({
        where:{email},
        data:{
          favResidenciesID:{
            set: user.favResidenciesID.filter((rid)=> rid !== id)
          }
        }
      })
      res.status(200).send({"message":"Removed from Favourite","user":updatedUser})
    }
    else{
      const updatedUser = await prisma.user.update({
        where:{email},
        data:{
          favResidenciesID:{
            push: id
          }
        }
      })
      res.status(200).send({message:"Add to Favourite",user:updatedUser})
    }
  } catch (error) {
    throw new Error(error)
  }
})

export const allFavouriteResidency = asyncHandler(async(req,res)=>{
  const {email} =req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where:{email},
      select:{
        favResidenciesID:true
      }
    })
    if(favResd.favResidenciesID.length === 0){
      res.status(404).send({message:"No! Favorite Residencies are there"})
    }
    else{
      res.status(200).send({message:"Favorite Residencies are shown Below",fav:favResd.favResidenciesID})
    }
  } catch (error) {
    throw new Error(error)
  }
})