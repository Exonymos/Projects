// styles/GlobalStyles.js
import css from "styled-jsx/css";

export const globalStyles = css.global`
  /* Font definitions */
  @font-face {
    font-family: "Exo";
    src: url("/font/Exo-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: "Exo Italic";
    src: url("/font/Exo-Italic-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: italic;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("/font/Montserrat-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
  }
  @font-face {
    font-family: "Montserrat Italic";
    src: url("/font/Montserrat-Italic-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: italic;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    /* Gray grid texture overlay */
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L40 40 L0 40' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1' fill='none'/%3E%3C/svg%3E");
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Exo", sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  /* Global layout & container styles */
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex: 1;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  /* Common styles for calculator pages */
  .calculator-container {
    padding: 2rem;
    max-width: 600px;
    margin: 2rem auto;
    background: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .calculator-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .form-group label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .form-group input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #444;
    border-radius: 4px;
    background: #2a2a2a;
    color: #e0e0e0;
  }
  button {
    padding: 0.75rem;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    color: #121212;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .result {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #2a2a2a;
    border-radius: 4px;
    text-align: center;
  }
`;
