import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      router.push("/");
    }
  }, [loading, session]);

  if (!loading && !session) {
    return (
      <>
        {!session && (
          <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col justify-center relative py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full justify-between max-w-sm lg:w-84">
                <div className="flex flex-col items-between">
                  <h2 className="text-5xl mb-16 font-extrabold text-center text-gray-900">Login</h2>

                  <button
                    onClick={() => signIn("google")}
                    className="px-8 mb-4 hover:opacity-70 text-black rounded-md py-4 bg-white shadow-lg flex items-center justify-start"
                  >
                    <img src="images/google-icon.svg" className="w-6 w-8 mr-3"></img>
                    Sign In With Google
                  </button>
                  {/* <button
                    onClick={() => signIn("facebook")}
                    className="px-8 hover:opacity-80 text-white rounded-md py-4 shadow-lg flex items-center justify-start"
                    style={{ background: "#3b5998" }}
                  >
                    <img src="images/facebook-icon.svg" className="w-6 w-8 mr-3"></img>
                    Sign In With Facebook
                  </button> */}
                </div>
                <div className="absolute bottom-4 left-0 w-full flex justify-center">
                  <img className="w-18" src="images/logo.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="images/login-cover.jpg"
                alt=""
              />
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
}
