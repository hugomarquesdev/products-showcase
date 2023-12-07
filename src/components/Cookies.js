import React from "react"
import CookieConsent from "react-cookie-consent"
import { Link } from "gatsby"

const Cookies = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Allow"
      cookieName="cookie"
      style={{
        background: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid #eeefed",
      }}
      contentStyle={{
        fontFamily: "arial, serif",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "11px",
        lineHeight: "15px",
        color: "#eeefed",
        maxWidth: "fit-content",
      }}
      buttonStyle={{
        color: "#281a08",
        background: "#eeefed",
        fontFamily: "arial, serif",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "11px",
        lineHeight: "15px",
        padding: "10px 20px",
      }}
      expires={7}
    >
      Our website uses{" "}
      <Link to="/" style={{ color: "#eeefed" }}>
        <u>cookies</u>
      </Link>{" "}
      to allow a better experience to the user. By browsing the site you are
      consenting to its use.
    </CookieConsent>
  )
}

export default Cookies
