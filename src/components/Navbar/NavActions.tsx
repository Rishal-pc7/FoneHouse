import Link from "next/link";

export function Navlinks ({classes}:Readonly<{classes:string}>){
    return(
      <div className={`${classes}`}>
        <div className=" links flex flex-col md:flex-row  items-start md:items-center h-full w-full md:w-[60%] gap-5 md:gap-12 justify-center font-semibold text-base">
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>
      </div>
        </div>
    )
}
