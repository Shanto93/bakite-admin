import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const CheckingPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h2>This page is only for checking</h2>
    </div>
  );
};

export default CheckingPage;
