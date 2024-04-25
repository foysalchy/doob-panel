import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";

const UseSupperAdmin = () => {
  const [isSupperAdmin, setIsSupperAdmin] = useState(false);
  const [isSupperAdminLoading, setIsSupperAdminLoading] = useState(true);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      if (user?.email) {
        fetch(
          `https://salenow-v2-backend.vercel.app/api/v1/users/supper-admin/${user?.email}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            setIsSupperAdmin(data?.isAdmin);
            setIsSupperAdminLoading(false);
          });
      } else {
        setIsSupperAdminLoading(false);
      }
    } else {
      setIsSupperAdminLoading(true);
    }
  }, [user?.email, setIsSupperAdmin, user]);
  return [isSupperAdmin, isSupperAdminLoading];
};

export default UseSupperAdmin;
