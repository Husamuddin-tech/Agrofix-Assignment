"use client";

import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";

const GardenBox = forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, ...rest }, ref) => (
    <Box
      ref={ref}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(0, 50, 0, 0.3)",
        borderRadius: 2,
        boxShadow: 3,
        backdropFilter: "blur(4px)",
        padding: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        ...sx,
      }}
      {...rest}
    />
  )
);

GardenBox.displayName = "GardenBox";
export default GardenBox;
