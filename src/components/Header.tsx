import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import Link from "next/link";

export default function Header() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  console.log(date);
  return (
    <header>
      <div className="relative flex max-w-7xl mx-auto justify-center">
        <div className="flex items-center ">
          <Image src={"/logo.webp"} width={48} height={48} alt="logo" />
          <div>
            <div className="text-red-700 font-bold text-2xl">News Express</div>
            <p>{date}</p>
          </div>
        </div>
        <div className="absolute right-0 top-4">
          <Link href={"/signin"} className="btn">
            সাইন ইন
          </Link>
          <Link
            href={"/signup"}
            className="btn btn-primary bg-red-700 hover:bg-red-800 border-0"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
      <NavLinks />
    </header>
  );
}
