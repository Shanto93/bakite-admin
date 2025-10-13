"use client"
import { useGetAllAgentsQuery } from "@/redux/api/agent/agentApi";
import React from "react";

const AgentData = () => {
  const {
    data: agentData,
    isLoading,
    isError,
  } = useGetAllAgentsQuery(undefined);
  console.log(agentData, isLoading, isError);
  return (
    <div>
      <p>Agent Data </p>
    </div>
  );
};

export default AgentData;
