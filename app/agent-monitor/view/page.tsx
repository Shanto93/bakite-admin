import type { Metadata } from "next";
import ViewClient from "./ViewClient";

export const metadata: Metadata = {
  title: "Bakite | All Executives",
  description: "Here you can see all the executives here and you can manage them",
};

export default function Page() {
  return <ViewClient />;
}

