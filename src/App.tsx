import { useState } from "react";
import Router from "./Router";
import styled, {createGlobalStyle, keyframes} from "styled-components";
import {ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import {darkTheme, lightTheme} from './theme';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atom";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  font-family: "Source Code Pro", monospace;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
a {
  color: inherit;
  text-decoration: none;
}
`;
const ToggleBtn = styled.button`
  position: fixed; left: 60px; top: 20px;
  padding: 5px;
  height: 30px;
  color: ${props => props.theme.toggleBtnText};
  background-color: ${props => props.theme.toggleBtn};
  border: none; border-radius: 5px;
  cursor: pointer;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((current) => !current);


  return <>
  <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    
    <GlobalStyle />
    <ToggleBtn onClick={toggleDarkAtom}>Toggle Mode</ToggleBtn>
    <Router />
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </ThemeProvider>
  </>
}

export default App;
