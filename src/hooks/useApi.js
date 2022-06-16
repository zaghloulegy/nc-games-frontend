import { useEffect, useState } from "react";
import { getUsers, getUserInfo } from "../utils/api";

export const useUsers = () => {
  const [usersWithInfo, setUsersWithInfo] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  useEffect(() => {
    setUsersLoading(true);
    const requestFunc = async () => {
      const request = await getUsers();

      const usersWithInfo = await Promise.all(
        request.users.map(async (user) => {
          const requestUserInfo = await getUserInfo(user.username);
          return requestUserInfo;
        })
      );

      setUsersWithInfo(usersWithInfo);
      setUsersLoading(false);
    };
    requestFunc();
  }, []);
  return { usersWithInfo, usersLoading };
};
