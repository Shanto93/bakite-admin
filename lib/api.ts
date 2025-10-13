export async function getAgentsByArea(area: string) {
  const url = `https://api.bakite.com.bd/api/v1/admin/executive/by-area?area=${encodeURIComponent(
    area
  )}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Agents HTTP ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{
    error: boolean;
    message: string;
    data: { _id: string; phone: string; name: string; area: string; avatar: string }[];
  }>;
}

export async function getOnboardShops(phone: string) {
  const url = `https://api.bakite.com.bd/api/v1/admin/executive/onboarded-shops?phone=${encodeURIComponent(
    phone
  )}`; 
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Shops HTTP ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{
    error: boolean;
    message: string;
    data:
      | {
          shopId: string;
          phone: string;
          name: string;
          picture: string;
          shopName: string;
          shopAddress: string;
          shopPicture: string;
          status: "Inactive" | "Active";
          lastLoginAt: string;
          lastConsumerAddedAt: string;
        }
      | Array<{
          shopId: string;
          phone: string;
          name: string;
          picture: string;
          shopName: string;
          shopAddress: string;
          shopPicture: string;
          status: "Inactive" | "Active";
          lastLoginAt: string;
          lastConsumerAddedAt: string;
        }>;
  }>;
}
