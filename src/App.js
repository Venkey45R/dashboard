import React, { useRef, useState, useEffect } from "react";

function App() {
  const colorRef = useRef();
  const headerRef = useRef();
  const headersizeRef = useRef();
  const subheaderRef = useRef();
  const subheadersizeRef = useRef();
  const [color, setcolor] = useState("");
  const [header, setheader] = useState("");
  const [headersize, setheadersize] = useState(20);
  const [subheader, setsubheader] = useState("");
  const [subheadersize, setsubheadersize] = useState(20);

  useEffect(() => {
    const storedColor = localStorage.getItem("color");
    const storedHeader = localStorage.getItem("head");
    const storedSubheader = localStorage.getItem("subhead");
    const storedHeaderSize = localStorage.getItem("headSize");
    const storedSubheaderSize = localStorage.getItem("subheadSize");

    setcolor(storedColor || "");
    setheader(storedHeader || "");
    setsubheader(storedSubheader || "");
    setheadersize(storedHeaderSize ? parseInt(storedHeaderSize, 10) : 20);
    setsubheadersize(storedSubheaderSize ? parseInt(storedSubheaderSize, 10) : 20);
  }, []);
  
  const handleInputChange = (event, setValue, attribute) => {
    const inputValue = event.target.value;
    localStorage.setItem(attribute, inputValue);
    setValue(inputValue);
  };

  const handleSliderChange = (event, setValue, attribute) => {
    const sliderValue = event.target.value;
    localStorage.setItem(attribute, sliderValue);
    setValue(parseInt(sliderValue, 10));
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const borderRadius = 15; // Adjust this value as needed
  
    canvas.width = 400; // Set the desired width
    canvas.height = 250; // Set the desired height
  
    if (color.includes("linear-gradient")) {
      // Handle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  
      // Extract colors from linear-gradient string
      const colors = color.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
  
      if (colors && colors.length >= 2) {
        // Set the gradient background on the canvas
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        ctx.fillStyle = gradient;
      } else {
        // Fallback to a solid color if extraction fails
        ctx.fillStyle = "white";
      }
  
      // Draw rounded rectangle
      ctx.roundRect(0, 0, canvas.width, canvas.height, borderRadius);
      ctx.fill();
    } else {
      // Set the background color for the entire canvas
      ctx.fillStyle = color;
  
      // Draw rounded rectangle
      ctx.roundRect(0, 0, canvas.width, canvas.height, borderRadius);
      ctx.fill();
    }
  
    // Apply text styles
    ctx.font = `${headersize}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Center the text vertically
  
    // Draw the header text
    const headerX = canvas.width / 2;
    const headerY = canvas.height / 2 - 25; // Center vertically by adjusting y-coordinate
    ctx.fillText(header, headerX, headerY);
  
    // Apply subheader text styles
    ctx.font = `${subheadersize}px Arial`;
  
    // Draw the subheader text
    const subheaderX = canvas.width / 2;
    const subheaderY = canvas.height / 2 + 25; // Center vertically by adjusting y-coordinate
    ctx.fillText(subheader, subheaderX, subheaderY);
  
    // Convert the canvas content to a data URL with the specified background color
    const dataUrl = canvas.toDataURL("image/png");
  
    // Create a temporary link element and trigger the download
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "generated-image.png";
    a.click();
  };
  
  
  // Function to draw a rounded rectangle
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
  };
  
  
  

  return (
    <div className="bg-gray-400 text-white min-h-screen">
      <div className="w-full h-40">
        <h1 className="pl-20 text-2xl font-bold py-4 bg-gray-600">
          FUNCTIONAL TOOLS
        </h1>
      </div>
      <div className="px-12 flex">
        <div className="block p-4 bg-gray-600 border border-3 border-white rounded-xl md:w-1/3">
          <h2 className="pl-3 text-3xl font-bold pb-4 mx-auto">Generate Awesome Stats:</h2>
          <h3 className="pl-3 pb-4">
            generate Awesome Statistic image to celebrate your achievements.
          </h3>
          <form className="">
            <label className="font-bold pl-3">Background:</label>
            <div className="flex md:pl-8 pl-3 md:pt-6 pt-3">
              <button className="md:flex-1 block px-6 py-1 text-white md:mr-4 my-1 rounded-md border border-white bg-gradient-to-r from-blue-300 to-violet-300" value={'linear-gradient(to left, #5C6BC0, #7E57C2)'} ref={colorRef} onClick={(e) => handleInputChange(e, setcolor, "color")}>&nbsp;</button>
              <button className="md:flex-1 block px-6 py-1 text-white md:mr-4 my-1 rounded-md border border-white bg-gradient-to-r from-green-200 to-yellow-200" value={'linear-gradient(to left, #8F9779, #FFB366)'} ref={colorRef} onClick={(e) => handleInputChange(e, setcolor, "color")}>&nbsp;</button>
              <button className="md:flex-1 block px-6 py-1 text-white md:mr-4 my-1 rounded-md border border-white bg-gradient-to-r from-pink-300 to-purple-200" value={'linear-gradient(to left, #FF6B6B, #9F7AEA)'} ref={colorRef} onClick={(e) => handleInputChange(e, setcolor, "color")}>&nbsp;</button>
              <button className="md:flex-1 block px-6 py-1 text-white md:mr-4 my-1 rounded-md border border-white bg-gradient-to-r from-red-500 to-yellow-200"  value={'linear-gradient(to left, #EF4444, #F59E0B)'} ref={colorRef} onClick={(e) => handleInputChange(e, setcolor, "color")}>&nbsp;</button>
            </div>

            <div className="block my-4">
              <label className=" font-bold pl-3">Header:</label><br />
              <input
                type="text"
                className="w-80 h-10 text-black rounded-md px-2 ml-8 mt-4"
                ref={headerRef}
                onChange={(e) => handleInputChange(e, setheader, "head")}
              />
            </div>
            <div className="block my-4">
              <label className=" font-bold pl-3">Header size:</label><br />
              <input
                type="range"
                min={30}
                max={50}
                value={headersize}
                onChange={(e) =>
                  handleSliderChange(e, setheadersize, "headSize")
                }
              />
            </div>
            <div className="block my-4">
            <label className="font-bold pl-3">Sub header:</label><br />
            <input
              type="text"
              className="w-80 h-10 text-black rounded-md px-2 ml-8 mt-4"
              ref={subheaderRef}
              onChange={(e) => handleInputChange(e, setsubheader, "subhead")}
            />
          </div>
            <div className="block my-4">
              <label className="font-bold pl-3">sub header size:</label><br />
              <input
                type="range"
                min={20}
                max={45}
                value={subheadersize}
                onChange={(e) =>
                  handleSliderChange(e, setsubheadersize, "subheadSize")
                }
                />
                <div />
            </div>
            <button className="block px-6 py-1 text-white my-4 rounded-md border border-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700" onClick={handleDownload}>Download</button>
          </form>
        </div>
        <div className="rounded-2xl mx-auto my-auto bg-gray-500 text-white" style={{ background: color }} id="exportTarget">
        <div className="w-80 h-60 py-6">
          <div className="flex items-center justify-center py-5">
            <h1 className="text-lg" style={{ fontSize: headersize }}>{header}</h1>
          </div>
          <div className="flex items-center justify-center py-5">
            <h2 className="" style={{ fontSize: subheadersize}}>{subheader}</h2>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
