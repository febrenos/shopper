import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #0DAB77;
    --secondary: #77e999;
    --background-primary: #FCFCFC;
    --background-secondary: #E3E3E3;
    --text-primary: #424242;
    --text-secondary: #5e5e5e;
    --text-tertiary: #979797;
    --disabled: #acacac;
    --background-gradient: linear-gradient(180deg,#43e28ab2,#139fd2a7);
    
    --shadow-card: rgba(99, 99, 99, 0.4) 0px 3px 9px 0px;
    --yellow-primary: #FBE438;
    --red-primary: #F25E62;
    --red-secondary: #c23846;
    --red-tertiary: #ff536437;
    --green-primary: #7EB431;
    --green-secondary: #33A474;
    --green-tertiary: #28a74684;
  }
  /* google.maps.TravelMode.DRIVING */
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  html, html:hover {
    background-color: var(--background-primary);
    color: var(--text-secondary-color);
    font-family: system-ui, monospace, 'Gill Sans';
    scroll-behavior: smooth;
  }

  body{
    transition:1s;
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  
  main{

  }

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

  img, a {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: var(--txt-primary);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  p {
    font-size: 17px;
  }

  ::-webkit-scrollbar {
    width: 16px;
    border-radius: 8px;
    padding: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 8px;
    border: 4px solid var(--background-primary);
  }

  ::-webkit-scrollbar-track {
    background: var(--background-primary);
    border-radius: 8px;
  }
  .contentOpen{
    transition: .6s;
    padding-left: 65px;
    @media(width < 768px){
        padding: 23px 0 0 0;
    }
}
.contentClose{
    transition: .6s;
    padding-left: 220px;
    @media(width < 768px){
        padding: 23px 0 0 0;
    }
}
`
