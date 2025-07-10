export const loaderHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
      
    body {
     background: linear-gradient(180deg,rgba(60, 61, 63, 1) 37%, rgba(39, 40, 42, 1) 100%);  
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
        }
    
    .loader {
    width: 3rem;
    height: 3rem;
    clear: both;
    margin: 1rem auto;
    border: 2px #fff solid;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .loader:after,
  .loader:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    width: inherit;
    height: inherit;
    animation: spVortex 2s infinite linear;
  }

  .loader:before {
    border-top: 0.5rem #fff solid;
    top: -0.1875rem;
    left: calc(-50% - 0.1875rem);
    transform-origin: right center;
  }

  .loader:after {
    border-bottom: 0.5rem #fff solid;
    top: 0.1875rem;
    right: calc(-50% - 0.1875rem);
    transform-origin: left center;
  }

  @keyframes spVortex {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }
      </style>
    </head>
    <body>
     <div class="loader" />
    </body>
    </html>
    `;
