import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useAuth from '../../../hooks/useAuth';
import AuthModal from '../../components/AuthModal';

// components
import Button from '../../components/Button';

// assets
import LogoPrincipal from '../../../public/images/logos/logo_principal.svg';
import CloseBtn from '../../../public/images/icons/close.svg';

const pages = {
    "/": 1,
    "/schedule": 2,
    "/about": 3,
    "/co": 4,
    "/user": 5,
}

const Nav = () => {

    const { user } = useAuth();
    // const { user } = false; // para deploy sem login
    const router = useRouter();
    
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleShowAuthModal = () => {
        if (window.pageYOffset != 0) {
            setTimeout(() => { handleShowAuthModal() }, 50);
        } else {
            setShowAuthModal(true);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <NavWrapper>
            <div>
                
            {/* Logo que redireciona para a home */}
            <Link href="/">
                <a className="logo-container">
                    <img src={LogoPrincipal} alt="SSI logo" />
                    <p className='text-small'>
                        Semana de Sistemas de Informação 2023
                    </p>
                </a>
            </Link>

            {/* Caixa de autenticação/login */}
            {showAuthModal &&
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    show={showAuthModal}
                />
            }

            {/* Navbar para Desktop */}
            <NavDesktop currentPage={router.pathname}>
                <ul>
                    <li>
                        <Link href="/"><a>Home</a></Link>
                        <div></div>
                    </li>

                    <li>
                        <Link href="/schedule" ><a>Programação</a></Link>
                        <div></div>
                    </li>

                    <li>
                        <Link href="/about"><a>Evento</a></Link>
                        <div></div>
                    </li>

                    <li>
                        <Link href="/co"><a>Comissão Organizadora</a></Link>
                        <div></div>
                    </li>

                    {user ?
                        <li className='userPicContainer'>
                            {/* <Link href="/user"><a><img src={user.photoUrl} alt="user pic" referrerPolicy="no-referrer" /></a></Link> */}
                            <Button onClick={handleShowAuthModal} disabled>Login</Button>
                        </li>
                        :
                        <li>
                            {/* <Button onClick={handleShowAuthModal}>Login</Button> */}
                            <Button onClick={handleShowAuthModal} disabled>Login</Button>
                        </li>

                    }
                </ul>
            </NavDesktop>

            {/* Navbar para Mobile */}
            <NavMobile isOpen={isOpen} currentPage={router.pathname}>
                <div className={isOpen ? "sidepanel" : "sidepanel sidepanel-hidden"}>

                    <ul>
                        {user ?
                            <li onClick={() => setIsOpen(false)}>
                                <div className='user-info' href="/user">
                                
                                    {/* <Link href="/user"><a><img src={user.photoUrl} alt="user pic" referrerPolicy="no-referrer" /></a></Link> */}
                                    <div>
                                        {/* <p className='welcome-user'>Olá{user.name ? `, ${user.name.split(' ')[0]}!` : '!'}</p>
                                        <a href="/user">Ver perfil</a> */}
                                        <Button onClick={handleShowAuthModal} disabled>Login</Button>
                                    </div>
                                
                                </div>
                            </li>
                            :
                            <li className='login-button' onClick={() => setIsOpen(false)}>
                                {/* <Button onClick={handleShowAuthModal}>Login</Button> */}
                                <Button onClick={handleShowAuthModal} disabled>Login</Button>
                            </li>
                        }

                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/"><a>Home</a></Link>
                            <div></div>
                        </li>

                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/schedule"><a>Programação</a></Link>
                            <div></div>
                        </li>

                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/about"><a>Evento</a></Link>
                            <div></div>
                        </li>

                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/co"><a>Comissão Organizadora</a></Link>
                            <div></div>
                        </li>

                    </ul>

                    <div className='close-btn' onClick={() => setIsOpen(!isOpen)}>
                        <div className='close'>
                            <img src={CloseBtn} alt='Botão de fechar'></img>
                        </div>
                        <p className='text-small'>Fechar</p>
                    </div>
                </div>

                <button className='hamburguer-menu' type="button" onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </NavMobile>

            </div>
        </NavWrapper>
    )
}

export default Nav;


const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
    position: fixed;
    width: 100%;
    height: 3.75rem;
    z-index: 10;
    background-color: var(--color-neutral-900);
    box-shadow: 0px 5px 24px 14px rgba(16,3,26,0.38);

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1440px;
        height: 100%;
    }

    .logo-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 14rem;
        gap: 1rem;

        img {
            height: 2.75rem;
        }
    }

    .text-small {
        font: 400 0.875rem/1.125rem 'Space_Mono_Bold';
        color: var(--color-neutral-50);
    }

    @media (min-width:1300px) {
        position: unset;
        height: 3.75rem;
        z-index: unset;
        justify-content: center;
        box-shadow: unset;
        padding-inline: 6.75rem;
    }
`

const NavMobile = styled.nav`
    overflow: hidden;

    .hamburguer-menu {
        background-color: unset;
        border: unset;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1.375rem;
        width: 2rem;

        span {
            display: block;
            height: 3px;
            width: 100%;
            background: #FFF;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
    }

    .sidepanel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: fit-content;
        position: fixed;
        top: 0;
        right: 0;
        background-color: var(--color-neutral-900);
        transition: all linear .15s;
        border-radius: 12px;
        padding: 1.5rem;
        
        .close-btn {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 5rem;
            cursor: pointer;
            
            .close {
                img {
                    width: 17.58px;
                    margin-top: 0.3rem;
                }
            }
        }

        ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .login-button {
                margin-bottom: 2rem;
                
                button {
                    padding-block: 0.65rem;
                }
            }

            li {
                margin-bottom: 1.5rem;
                position: relative;

                .user-info {
                    width: fit-content;
                    max-width: 100%;
                    height: 2.75rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    > div {
                        display: flex;
                        flex-direction: column;
                        align-items: left;
                        justify-content: left;
                    }

                    p {
                        font: 400 0.875rem/1.125rem 'Space_Mono_Bold';
                        color: #fff;
                        margin-bottom: 2px;
                    }

                    a {
                        margin: 0;
                        font: 700 0.75rem/1rem 'Space_Mono';
                        cursor: pointer;
                        
                        &:hover, &:active {
                            text-decoration: underline;
                        }
                    }

                    ${props => props.currentPage == '/user' && css`
                        pointer-events: none;
                    `}
                }

                a {
                    color: var(--color-neutral-50);
                    margin: 0 12px;
                    transition: all .2s;
                }

                span {
                    color: gray;
                    margin: 0 12px;

                    cursor: default;
                }

                img {
                    width: 2.75rem;
                    border-radius: 100%;
                    margin-right: 1rem;

                    ${props => props.currentPage == '/user' && css`
                        border: 4px solid var(--color-primary-500);
                    `}
                }

                a:active {
                    cursor: pointer;
                    color: var(--color-secondary);
                    filter: brightness(1.1);
                }
            }

            ${props => props.currentPage && css`
                li:nth-child(${pages[props.currentPage]+1}){
                    a {
                        font-family: 'Space_Mono_Bold';
                        font-weight: 400;
                        padding: .2rem -5rem;
                        pointer-events: none;
                        /* border-bottom: 4px solid var(--color-primary-500); */
                    }

                    div {
                        width: calc(100% - 24px);
                        margin-left: 12px;
                        height: 4px;
                        background-color: var(--color-primary-500);
                        border-radius: 12px;
                    }
                }
            `}
        }

        @media (max-height:590px) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            max-width: unset;

            ul {
                width: 45%;
                margin-top: 0;
                margin-right: 10px;
            }
        }
    }

    .sidepanel-hidden {
        right: -450px;

        @media (max-height:590px) {
            right: -100%;
        }
    }

    @media (min-width:850px) {
        display: none;
    }
`

const NavDesktop = styled.nav`
    display: none;
    margin-left: auto;

    ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;

        li {
            position: relative;
            max-height: 44px;

            div {
                position: absolute;
                margin-top: 2px;
                width: 0%;
                margin-left: 50%;
                height: 4px;
                background-color: var(--color-neutral-50);
                transition: all .2s;
                border-radius: 12px;
            }

            &:last-child {
                margin-left: 0.75rem;
            }

            a {
                max-height: 44px;
            }
        }

        button {
            padding-block: 0.65rem;
            height: 44px;
            width: 108px;
        }

        .userPicContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-left: 0.75rem;

            img {
                width: 44px;
                border-radius: 100%;
                transition: 0.1s;

                &:hover {
                    border: 4px solid white;
                }
            }
                        

            ${props => props.currentPage == '/user' && css`

                :nth-child(${pages[props.currentPage]}):hover {
                    li, a {
                        pointer-events: none;
                    }
                }
            `}

            ${props => props.currentPage == '/user' && css`
            
                img {
                    border: 4px solid var(--color-primary-500);
                }
            `}
        }

        a {
            font: 700 1rem/1.25rem 'Space_Mono';
            margin: 0 12px;
            transition: all .2s;

            :hover {
                cursor: pointer;
            }
        }

        span {
            color: gray;
            margin: 0 12px;
            cursor: default;
        }

        ${props => props.currentPage && css`
            li:nth-child(${pages[props.currentPage]}):not(:last-child) {
                a {
                    font-family: 'Space_Mono_Bold';
                    font-weight: 400;
                    padding: .2rem -5rem;
                    pointer-events: none;
                }

                div {
                    width: calc(100% - 24px);
                    margin-left: 12px;
                    height: 4px;
                    background-color: var(--color-primary-500);
                }
            }

            li:not(:last-child):not(:nth-child(${pages[props.currentPage]})):hover {
                div {
                    width: calc(100% - 24px);
                    margin-left: 12px;
                    height: 4px;
                    background-color: var(--color-neutral-50);
                }
            }
        `}

    }

    @media (min-width:850px) {
        display: block;
    }
`