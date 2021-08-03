import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  const [helpData, setHelpData] = useState([]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    // async function fetchData() {
    //   let { data } = await axios({
    //     method: "get",
    //     url: `/api/help/`,
    //   });

    //   setHelpData(data);
    // }

    // if (!loading && session) {
    //   fetchData();
    // }
  }, [loading, session]);

  return (
    <>
      {session && !loading && (
        <>
          <div>hello</div>
        </>
      )}
    </>
  );
}
