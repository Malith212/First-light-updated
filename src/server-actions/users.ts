"use server";

import { connectMongoDB } from "<pages>/config/db";
import UserModel from "<pages>/models/user-model";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const currentUserFromClerk = await currentUser();

    // check if user exists in the database return user data
    const user = await UserModel.findOne({
      clerkUserId: currentUserFromClerk?.id,
    });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // if user does not exist in the database create a new user and return user data
    const newUser = new UserModel({
      name:
        currentUserFromClerk?.firstName + " " + currentUserFromClerk?.lastName,
      clerkUserId: currentUserFromClerk?.id,
      email: currentUserFromClerk?.emailAddresses[0].emailAddress,
      profilePic: currentUserFromClerk?.imageUrl,
      isAdmin: false,
      isActive: true,
    });

    await newUser.save(); 

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Error while fetching user data from MongoDB",
    };
  }
};
