function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{`
                @font-face {
                    font-family: "Exo";
                    src: url("/fonts/Exo-VariableFont_wght.ttf")
                        format("truetype");
                    font-weight: 100 900;
                    font-style: normal;
                }
                @font-face {
                    font-family: "Exo Italic";
                    src: url("/fonts/Exo-Italic-VariableFont_wght.ttf")
                        format("truetype");
                    font-weight: 100 900;
                    font-style: italic;
                }
                @font-face {
                    font-family: "Montserrat";
                    src: url("/fonts/Montserrat-VariableFont_wght.ttf")
                        format("truetype");
                    font-weight: 100 900;
                    font-style: normal;
                }
                @font-face {
                    font-family: "Montserrat Italic";
                    src: url("/fonts/Montserrat-Italic-VariableFont_wght.ttf")
                        format("truetype");
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
            `}</style>
        </>
    );
}

export default MyApp;
