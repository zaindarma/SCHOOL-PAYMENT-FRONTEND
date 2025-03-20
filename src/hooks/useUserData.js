const { me } = require("@/services/userService");
const { useState, useEffect } = require("react");

const useUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await me();
        if (!res.status) {
          setError(res.error);
          console.log("Data tidak ada : ", res.error);
        } else {
          setUserData(res.data);
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Terjadi kesalahan:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { userData, loading, error, setUserData };
};

export default useUser;
