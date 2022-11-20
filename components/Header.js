import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProjectLogo from '../assets/ProjectLogo.png'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex sticky top-0 z-50`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={ProjectLogo} height={40} width={40} />
          <div className={style.logoText}>NFTIT</div>
        </div>
      </Link>
      <div className={style.headerItems}>
        <Link href="/collections/0xe2a0564572ebAFCAB06d896a3F83F5448a5e71e7">
          <div className={style.headerItem}> Explore </div>
        </Link>
        <Link href="https://opensea.io/learn" target="_blank"><div className={style.headerItem}> Resources </div></Link>
        <Link href="/#Faq"><div className={style.headerItem}> FAQ </div></Link>
      </div>
    </div>
  )
}

export default Header