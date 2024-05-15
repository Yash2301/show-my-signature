import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { ChromePicker } from "react-color";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const SignaturePad = () => {
  const sigCanvas = useRef(null);
  const [size, setSize] = useState({ width: 500, height: 200 });
  const [penColor, setPenColor] = useState("black");
  const [fileName, setFileName] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const sizes = [
    { label: "Small (300x150)", width: 300, height: 150 },
    { label: "Medium (500x200)", width: 500, height: 200 },
    { label: "Large (800x400)", width: 800, height: 400 },
    { label: "Custom Ratio 1:1 (400x400)", width: 400, height: 400 },
  ];

  const clear = () => {
    sigCanvas.current.clear();
  };

  const download = () => {
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "signature.png";
    if (fileName) {
      link.download = fileName + "_signature.png";
    }
    link.click();
  };

  const downloadWithSize = () => {
    const scaleCanvas = document.createElement("canvas");
    scaleCanvas.width = size.width;
    scaleCanvas.height = size.height;
    const context = scaleCanvas.getContext("2d");
    context.drawImage(
      sigCanvas.current.getTrimmedCanvas(),
      0,
      0,
      size.width,
      size.height
    );
    const dataUrl = scaleCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `signature_${size.width}x${size.height}.png`;
    if (fileName) {
      link.download = `signature_${fileName}_${size.width}x${size.height}.png`;
    }

    link.click();
  };

  const handleSizeChange = (event) => {
    const selectedSize = sizes.find(
      (size) => size.label === event.target.value
    );
    setSize({ width: selectedSize.width, height: selectedSize.height });
  };

  const handleColorChange = (color) => {
    // setPenColor(color.hex);
    // setDisplayColorPicker(false);
  };

  return (
    <Box textAlign="center" sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Signature Pad
      </Typography>
      <SignatureCanvas
        ref={sigCanvas}
        penColor={penColor}
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
      />
      <Box sx={{ m: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, mx: 1 }}>
          <InputLabel>Select Size</InputLabel>
          <Select
            label="Select Size"
            onChange={handleSizeChange}
            defaultValue="Medium (500x200)"
          >
            {sizes.map((size) => (
              <MenuItem key={size.label} value={size.label}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <TextField
            id="outlined-basic"
            label="Custom Signature Name"
            variant="outlined"
            onChange={(val) => {
              setFileName(val?.target?.value);
            }}
          />
        </FormControl>
        <IconButton
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          sx={{ mx: 1 }}
          style={{
            color: penColor,
          }}
        >
          <ColorLensIcon />
          {displayColorPicker && (
            <Box
              position="absolute"
              zIndex="popover"
              style={{
                zIndex: 9999999999,
              }}
            >
              <ChromePicker
                color={penColor}
                disableAlpha
                onChange={(color) => {
                  setPenColor(color?.hex);
                }}
                onChangeComplete={handleColorChange}
              />
            </Box>
          )}
        </IconButton>
      </Box>
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={clear}
          sx={{ mx: 1 }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={download}
          sx={{ mx: 1 }}
        >
          Download Original
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={downloadWithSize}
          sx={{ mx: 1 }}
        >
          Download with Size
        </Button>
      </Box>
    </Box>
  );
};

export default SignaturePad;
