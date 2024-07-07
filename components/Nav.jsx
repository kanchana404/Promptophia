"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
const [providers, setproviders] = useState(null);
useEffect(() => {
  const setproviders = async () => {
    const response = await getProviders();
    setproviders(response);
  }
  setproviders();
}, [])

const [togleDropdown, setTogleDropdown] = useState(false)
  const signOut = () => {

  };
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
        src="/assets/images/logo.svg"
        alt="Promptopia Logo"
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className='black_btn'>
            Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign out
            </button>
            <Link href='/profile'>
            <Image 
            src="/assets/images/logo.svg"
            alt="Profile"
            width={37}
            height={37}
            className="rounded-full"
            />
            </Link>
          </div>
        ):(
          <>
          {providers && 
          Object.values(providers).map((provider) => (
            <button type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn"
            >
              Sign In
            </button>
          ))
          }
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
         <div className="flex">
          <Image 
            src="/assets/images/logo.svg"
            alt="Profile"
            width={37}
            height={37}
            className="rounded-full"
            onClick={() => setTogleDropdown((prev) => !prev)}
            />

            {togleDropdown && (
              <div className="dropdown">
                <Link
                href='/profile'
                className="dropdown_link"
                onClick={() => setTogleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                href='/create-prompt'
                className="dropdown_link"
                onClick={() => setTogleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {setTogleDropdown(false); signOut()}}
                  className="mt-5 w-full black_btn"
                  
                  >
                SignOut
                </button>
              </div>
            )
          }
         </div> 
        ):(
          <>
          {providers && 
          Object.values(providers).map((provider) => (
            <button type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn"
            >
              Sign In
            </button>
          ))
          }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
