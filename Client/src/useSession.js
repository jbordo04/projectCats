import { useEffect, useState } from "react";
import { fakeApi } from "./fakeApi";
import { fakeCache } from "./fakeCache";

export const useSession = () => {
  const SESSION_KEY = 1;
  const cache = fakeCache.getItem(SESSION_KEY);
  const [data, setData] = useState(cache);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cache) {
      setLoading(true);
    }
    fakeApi
      .getSession()
      .then((session) => {
        if (session) {
          setData(session);
          fakeCache.setItem(SESSION_KEY, session);
        } else {
          setData(null);
          fakeCache.clear();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, setData, loading };
};
