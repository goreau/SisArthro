<template>
    <div id="footer">
          <p>Instituto Pasteur &copy; 2023</p>
      </div> 
  </template>
  
  <script>
  export default {
      name: 'Footer'
  }
  </script>
  
  <style scoped>
      /*#footer{
          height: 200px;
          background-color: #222;
          border-top: 4px solid #111;
          color: #FCBA03;
          display: flex;
          align-items: center;
          justify-content: center;
          bottom: 0;
          width: 100%;
      }*/
      #footer{
          background-color: #13156e;
          border-top: 6px solid #1d1a18;
          
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          color: #C0B59C;
          height: 3rem;
          z-index: 98;
          position:fixed;
          margin-bottom:0px;
      }
  </style>