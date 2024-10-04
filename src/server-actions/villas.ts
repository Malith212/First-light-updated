"use server";

import VillaModel from "<pages>/models/villa-model";
import { connectMongoDB } from "<pages>/config/db";
import { revalidatePath } from "next/cache";
import { message } from "antd";

connectMongoDB();

export const AddVila = async (payload: any) => {
  try {
    const newVilla = new VillaModel(payload);

    const res = await newVilla.save();

    revalidatePath("/admin/villas");
    return {
      success: true,
      message: "Villa added successfully",
    };
  } catch (error: any) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};

export const EditVilla = async ({
  villaId,
  payload,
}: {
  villaId: string;
  payload: any;
}) => {
  try {
    await VillaModel.findByIdAndUpdate(villaId, payload);
    revalidatePath("/admin/villas");
    return {
      success: true,
      message: "Villa updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
