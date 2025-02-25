export const getInvestmentStatusColor = (status?: string): string => {
    const statusMap: Record<string, string> = {
      pending: "text-yellow-500",
      ongoing: "text-blue-500",
      matured: "text-green-500",
      successful: "text-green-500",
      canceled: "text-red-700",
      failed: "text-red-700",
    };
  
    return status ? statusMap[status.toLowerCase()] || "text-gray-500" : "text-gray-500";
  };
  
  