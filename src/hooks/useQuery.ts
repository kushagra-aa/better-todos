import { useState } from "react";

function useQuery<T>(defaultValue: T) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState<{ message: string } | null>(null);
  return { isLoading, setIsLoading, data, setData, setError, error };
}

export default useQuery;
