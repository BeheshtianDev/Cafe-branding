import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full text-black p-4  font-semibold text-[20px]  z-50 flex justify-between fixed top-0">
      <Link href="/" className="text-[25px]">
        belavista
      </Link>
      <a
        href="https://maps.app.goo.gl/yJvTuhKUt4aR1C6r8"
        target="_blank"
        rel="noopener noreferrer"
        className=" de:flex mo:hidden justify-end  items-center flex-row-reverse gap-2"
      >
        <span className="animated-link peer">Tehran, Iran</span>
        <div className="w-[180px] h-[35px]  text-sm rounded-lg overflow-hidden absolute backdrop-blur-md backdrop-brightness-90 top-14  font-normal peer-hover:opacity-70 opacity-0 flex  justify-center items-center transition-all duration-700">
          Open in google maps
        </div>
        <span className="bg-black/70 peer-hover:bg-black/100 w-2 h-2 mb-[3px] rounded-full transition-all duration-200"></span>
      </a>
      <div className="de:flex mo:hidden gap-3 items-center ">
        <Link href="/" className="animated-link">
          story
        </Link>

        <Link href="/" className="animated-link">
          products
        </Link>

        <Link href="/" className="animated-link">
          gallery
        </Link>

        <Link href="/" className="animated-link">
          contact
        </Link>
      </div>
      <Link href="/Reserve" className="animated-link de:flex mo:hidden items-center">
        visit us
      </Link>
      <button className="cursor-pointer mo:flex de:hidden  ">menu</button>
    </div>
  );
};

export default Header;
