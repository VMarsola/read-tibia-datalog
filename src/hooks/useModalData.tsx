import { useState, useContext, useCallback, useEffect } from "react";
import { fetchServerLog } from "../api/api";
import LogContext from "../contexts/LogContext";

export default function useInputData() {
  const { state, setState } = useContext(LogContext);

  const [loading, setloading] = useState(false);

  const fetchData = useCallback(async () => {
    setloading(true);
    const res = await fetchServerLog();
    if (res) {
      setState({ data: res });
    }
    setloading(false);
  }, [setState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    fetchData,
    state,
  };
}
