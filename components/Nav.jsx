'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession()

    // const userLogedIn = true;
    const [providers,setProvider] = useState(null);
    const [toggleDropdown,setToggleDropdown] = useState(false)
    
    useEffect(()=>{
        const setProviders = async () => {
            const response = await getProviders();

            setProvider(response)
            console.log('hello');
        }

        setProviders()
    },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
            <Image 
                src="./assets/images/logo.svg"
                width={30}
                height={30}
                alt="smart prompt logo"
                className="object-contain"
            />
            <p className="logo_text"> Smart Prompt</p>
        </Link>
        <div className="sm:flex hidden ">
            {session?.user ? 
                <div className="flex gap-3 md:gap-5">
                    <Link
                        href='/create-post'
                        className="black_btn"
                    >
                        Create Post
                    </Link>

                    <button
                        type="button"
                        className="outline_btn"
                        onClick={() => signOut()}
                    >Sign Out</button>

                    <Link
                        href='/profile'    
                    >
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="Your profile image"
                            className="rounded-full"
                        />
                    </Link>
                </div>:
                <>
                    {providers && 
                        <AutnProviders providers={providers} />
                    }
                </>
            }
        </div>

        <div className="sm:hidden flex relative">
            {session?.user ? 
                <div className="flex">
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        alt="Your profile image"
                        className="rounded-full"
                        onClick={()=>setToggleDropdown(prev => !prev)}
                    />
                    {toggleDropdown && (
                        <div className="dropdown ">
                            <Link
                                href='/profile'
                                className="dropdown_link"
                                onClick={()=> setToggleDropdown(false)}
                            >
                                My profile
                            </Link>
                            <Link
                                href='/create-prompt'
                                className="dropdown_link"
                                onClick={()=> setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                            type="button"
                            className="black_btn mt-5 w-full "
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            >Sign Out</button>
                        </div>
                    )}

                </div>
                : 
                <>
                    {providers && 
                       <AutnProviders providers={providers} />
                    }
                </>
            }
        </div>
    </nav>
  )
}

const AutnProviders = ({providers}) => {
    return (
        
        Object.values(providers).map( provider => (
            <button
                type="button"
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="black_btn "
            >
                Sign In
            </button>
        ))
        
    )
}

export default Navbar;