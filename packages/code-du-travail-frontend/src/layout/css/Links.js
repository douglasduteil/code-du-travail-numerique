import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { colors } = theme;
export default createGlobalStyle`
  a,
  a:visited {
    text-decoration: underline;
    color: ${colors.blue};
  }

  a:focus,
  a:hover,
  a:active {
    text-decoration: none;
  }
  a[target="_blank"]:after,
  a[href^="http://"]:not([href*="social.gouv.fr"]):after,
  a[href^="https://"]:not([href*="social.gouv.fr"]):after{
    content: "";
    position: relative;
    top: 1px;
    display: inline-block;
    background: url("/static/assets/icons/external-link.svg") no-repeat 100% 50%;
    background-size: 15px;
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
`;
