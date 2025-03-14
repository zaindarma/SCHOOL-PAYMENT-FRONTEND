import Link from "next/link";

export default function success() {
  return (
    <div className="min-h-screen gap-3 flex flex-col items-center justify-center">
      <h1 className="text-2xl">Account Successfully Registered!</h1>
      <Link href={"/main"}>
        <button className="rounded-lg bg-red-600 text-white px-5 transition-all duration-300 hover:bg-white hover:text-red-600">
          BACK
        </button>
      </Link>
    </div>
  );
}
