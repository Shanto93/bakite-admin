"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetAllConsumersQuery,
  useGetAllShopkeepersQuery,
} from "@/redux/api/agent/agentApi";

export function SectionCards() {
  // Fetch total consumers
  const {
    data: totalConsumers,
    isLoading,
    isError,
  } = useGetAllConsumersQuery();
  const {
    data: totalShopkeepers,
    isLoading: shopLoading,
    isError: shopError,
  } = useGetAllShopkeepersQuery();

  const displayCount = isLoading
    ? "Loading..."
    : isError
    ? "Error"
    : totalConsumers ?? 0;
  const displayAhopkeepersCount = shopLoading
    ? "Loading..."
    : shopError
    ? "Error"
    : totalShopkeepers ?? 0;

  console.log("Consumer count:", totalConsumers);
  console.log("Shpokeepers count:", totalShopkeepers);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* ----- Total Consumers Card ----- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Consumers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {displayCount}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total consumers so far</div>
        </CardFooter>
      </Card>
      {/* ----- Total Shopkeepers Card ----- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Shopkeepers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {displayAhopkeepersCount}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total shopkeepers so far</div>
        </CardFooter>
      </Card>
    </div>
  );
}
