"use server";

import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const id = formData.get("id") as string;
  const userName = formData.get("userName") as string;
  const fisrtName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: fisrtName || undefined,
        lastName: lastName || undefined,
        phones: [phone] || undefined,
      },
      loginEmail: email || undefined,

      profile: {
        nickname: userName || undefined,
      },
    });

    console.log(response)
  } catch (err) {
    console.log(err);
  }
};
