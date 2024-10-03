"use server";

import VillaModel from "<pages>/models/villa-model";
import { connectMongoDB } from "<pages>/config/db";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const AddVila = async (payload: any) => {
    
  try {
    const newVilla = new VillaModel(payload);
    
    const res = await newVilla.save();
    
    revalidatePath("/admin/villas");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};
