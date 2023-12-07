import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import { media } from "./MediaQueries"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { debounce } from "./utils/debounce"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "../images/logo.svg"
import LogoWhite from "../images/logo-white.svg"

const Header = ({ content, bgColor, page, dark }) => {
  const { languages, originalPath } = useI18next()
  const breakpoints = useBreakpoint()
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(
    page === "contact" ? true : false
  )

  //HIDE NAVBAR ON SCROLL
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 5) ||
        currentScrollPos < 5
    )

    setPrevScrollPos(currentScrollPos)
  }, 25)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <HeaderStyled
      style={{
        top: !breakpoints.xl
          ? visible
            ? "0"
            : "-96px"
          : visible
          ? "0"
          : "-133px",
      }}
      bgColor={bgColor}
      page={page}
      dark={dark}
    >
      <header>
        <div className="main-wrapper">
          <div className="main">
            <div className="image-container">
              <Link to="/">{dark ? <LogoWhite /> : <Logo />}</Link>
            </div>
            <div className="main-menu">
              <div className="languages">
                <span>{content.language}</span>
                {languages.map((lng, i) => (
                  <span key={i}>
                    <Link to={originalPath} language={lng}>
                      {lng}
                    </Link>
                    {/* {i !== lng.length && "\u00a0|\u00a0"} */}
                  </span>
                ))}
              </div>
              <div className="links">
                {content.pages.map((page, i) => (
                  <Link to={page.link} key={i} activeClassName="chevron">
                    {page.page}
                  </Link>
                ))}
              </div>
              <div className="contact">
                <div
                  className="contact-container"
                  onMouseOver={() => setShowSecondaryMenu(true)}
                  onFocus={() => setShowSecondaryMenu(true)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <Link to={content.contactsLink} activeClassName="chevron">
                    {content.contacts}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showSecondaryMenu && !breakpoints.l && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="secondary-menu contacts"
              onMouseOver={() => setShowSecondaryMenu(true)}
              onMouseLeave={() =>
                setShowSecondaryMenu(page === "contact" ? true : false)
              }
            >
              {content.secondaryMenu.map((content, i) => (
                <a href={content.link} key={i} target="_blank" rel="noreferrer">
                  {content.text}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </HeaderStyled>
  )
}

export default Header

// DESKTOP
const HeaderStyled = styled.div`
  position: sticky;
  z-index: 9;
  transition: top 0.4s;
  transition-timing-function: ease-in-out;
  /* background-color: ${props =>
    props.bgColor ? props.bgColor : "transparent"}; */

  .chevron {
    position: relative;

    ::after {
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%) rotate(-45deg);
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      content: "";
      display: inline-block;
      height: 0.45em;
      width: 0.45em;
      vertical-align: bottom;
    }
  }

  header {
    position: relative;

    .main-wrapper {
      position: relative;
      background-color: ${props =>
        props.bgColor ? props.bgColor : "transparent"};
      z-index: 1;

      .main {
        max-width: 1920px;
        margin: 0 auto;
        padding: 25px 5% 0 5%;
        position: relative;

        ${media.l`
                    padding:20px 5% 0 5%;       
                `}

        span, a {
          font-family: "Cabin", sans-serif;
          letter-spacing: 1px;
          color: ${props => props.dark && "#eeefed"};
        }

        .image-container {
          margin: 0 0 25px 0;

          ${media.l`
                        width:50%;
                        margin:0 auto;
                    `}

          a {
            display: flex;
            justify-content: center;

            svg {
              max-width: 250px;
              max-height: 45px;
              width: 100%;
            }
          }
        }

        .main-menu {
          display: grid;
          grid-template-columns: 0.8fr 1fr 0.8fr;
          grid-template-areas: "languages links contact";
          grid-row-gap: 25px;

          ${media.l`
                        grid-template-columns: auto;
                        grid-template-areas:
                            "languages languages contact" 
                            "links links links";
                        grid-row-gap:0;
                        padding:20px 0 0 0;   
                    `}

          .languages {
            grid-area: languages;
            padding: 25px 0;
            border-top: ${props =>
              props.dark ? "1px solid #eeefed" : "1px solid #1b1c22"};

            ${media.l`
                            padding:15px 0;
                        `}

            a {
              text-transform: uppercase;
            }
          }

          .links {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            grid-area: links;
            padding: 25px 0;
            border-top: ${props =>
              props.dark ? "1px solid #eeefed" : "1px solid #1b1c22"};

            ${media.l`
                            padding:15px 0;
                        `}
          }

          .contact {
            grid-area: contact;
            text-align: right;
            border-top: ${props =>
              props.dark ? "1px solid #eeefed" : "1px solid #1b1c22"};

            .contact-container {
              height: 100%;
              width: fit-content;
              margin-left: auto;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

    .secondary-menu {
      box-sizing: border-box;
      width: 100%;
      background-color: ${props => (props.dark ? "#eeefed" : "#1b1c22")};
      padding: 12px 5%;
      justify-content: center;
      align-items: center;
      gap: 8vw;
      position: ${props =>
        props.page === "contact" ? "relative" : "absolute"};
      display: flex;
      z-index: 0;

      a {
        color: ${props => (props.dark ? "#1b1c22" : "#eeefed")};
      }
    }
  }
`
