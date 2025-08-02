"use server";

import { FieldValues } from 'react-hook-form';

export const userLogin = async (data: FieldValues) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
         // credentials: 'include',
      }
   );

   const userInfo = await res.json();

   // if (!res.ok) {
   //    throw new Error(userInfo?.message || "Login failed");
   // }

   // const passwordChangeRequired = userInfo?.data?.needPasswordChange;

   // // Optional: you can handle token etc. here if needed
   // // if (userInfo?.data?.accessToken) {
   // //    setAccessToken(userInfo.data.accessToken, {
   // //       redirect: '/dashboard',
   // //       passwordChangeRequired,
   // //    });
   // // }

   return userInfo;
};
