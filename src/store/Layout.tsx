import { Box, Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: 'url("/backgrounds/garden-texture.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
        {children}
      </Container>
    </Box>
  );
}
