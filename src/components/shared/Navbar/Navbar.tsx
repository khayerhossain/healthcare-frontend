"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButton = dynamic(() => import("@/components/ui/authButton/authButton"), {
    ssr: false,
  });

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        {/* Logo/Brand */}
        <Typography component={Link} href="/" fontWeight={600}>
          P
          <Box component="span" color="primary.main" fontWeight="bold">
            H
          </Box>{" "}
          Health Care
        </Typography>

        {/* Nav Links */}
        <Stack direction="row" spacing={4}>
          <Typography component={Link} href="/" sx={{ cursor: "pointer" }}>
            Consultation
          </Typography>
          <Typography component={Link} href="/" sx={{ cursor: "pointer" }}>
            Health Plans
          </Typography>
          <Typography component={Link} href="/" sx={{ cursor: "pointer" }}>
            Medicine
          </Typography>
          <Typography component={Link} href="/" sx={{ cursor: "pointer" }}>
            Diagnostics
          </Typography>
          <Typography component={Link} href="/" sx={{ cursor: "pointer" }}>
            NGOS
          </Typography>
        </Stack>

        {/* Login / Logout Button */}
        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navbar;
