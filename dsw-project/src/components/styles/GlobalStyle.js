import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        --background: #ffffff;
    }

    body {
        width : 100vw;
        height : 100vh;
        background-color: blue;
        font-family: Arial, Helvetica, sans-serif;
        overflow-x : hidden;
        background-color: var(--background);
    }

    ::-webkit-scrollbar {
        width: 15px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #888;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

`;

export default GlobalStyle;