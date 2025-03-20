import { useRouter } from "next/router";

const ForbiddenPage = () => {
  const router = useRouter();
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

        /* Global Styles */
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background: black;
        }

        * {
          font-family: 'Press Start 2P', cursive;
          box-sizing: border-box;
        }

        /* Container */
        #app {
          padding: 1rem;
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          color: #54FE55;
          text-shadow: 0px 0px 10px #54FE55;
          font-size: 6rem;
          flex-direction: column;
        }

        /* Text */
        .txt {
          font-size: 1.8rem;
        }

        /* Blinking Animation */
        @keyframes blink {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }

        .blink {
          animation: blink 1s infinite;
        }
      `}</style>

      {/* HTML Structure */}
      <div id="app">
        <div>403</div>
        <div className="txt">
          Forbidden<span className="blink">_</span>
        </div>
        <button
          onClick={() => router.push("/main")}
          className="px-6 py-3 text-lg font-semibold  bg-gradient-to-r txt 
                 rounded-lg shadow-md  transition-transform hover:text-white
                 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          Home
        </button>
      </div>
    </>
  );
};

export default ForbiddenPage;
