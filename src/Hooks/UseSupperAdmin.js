import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";


const UseSupperAdmin = () => {
  const [isSupperAdmin, setIsSupperAdmin] = useState(false);
  const [isSupperAdminLoading, setIsSupperAdminLoading] = useState(true);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      if (user?.email) {
        fetch(`http://localhost:5000/users/supperadmin/${user?.email}`)
          .then((res) => res.json())
          .then(async (data) => {
            await setIsSupperAdmin(data?.isAdmin);
            await setIsSupperAdminLoading(false);
          });
      }
      else {
        setIsSupperAdminLoading(false)

      }
    }
    else {
      setIsSupperAdminLoading(true)
    }
  }, [user?.email, setIsSupperAdmin, user]);
  return [isSupperAdmin, isSupperAdminLoading];
};

export default UseSupperAdmin;
