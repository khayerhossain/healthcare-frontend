"use client";
import { Box, Button, Container, Stack, Typography, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import assets from "@/assets";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeuserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";


export const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (values: FieldValues) => {
        try {
            const res = await userLogin(values);
            console.log("Login Response:", res);

            if (res?.data?.accessToken) {
                toast.success("Login successful!");
                storeuserInfo({ accessToken: res?.data?.accessToken });
                router.push("/dashboard");
            } else {
                setError(res.message || "Login failed");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            alert("Login request failed");
        }
    };

    return (
        <Container>
            <Stack
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <PHForm onSubmit={handleLogin} resolver={zodResolver(validationSchema)}>
                    <Box
                        width="100%"
                        maxWidth={600}
                        boxShadow={1}
                        borderRadius={1}
                        padding={4}
                    >
                        {/* Logo & Title */}
                        <Stack
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            mb={2}
                        >
                            <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
                            <Typography variant="h6" fontWeight={600}>
                                Login to Your Account
                            </Typography>
                        </Stack>

                        {/* Email & Password Fields (side by side on large, stacked on small) */}
                        <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
                            <Box sx={{ flex: '1 1 48%' }}>
                                <PHInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 48%' }}>
                                <PHInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                />
                            </Box>
                        </Stack>
                        {/* Error message */}
                        {error && (
                            <Typography color="error" variant="body2" align="center" mb={2}>
                                {error}
                            </Typography>
                        )}

                        {/* Login button */}
                        <Box sx={{ width: '100%' }}>
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Box>

                        {/* Register link */}
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Typography variant="body2" align="center">
                                Don’t have an account?{" "}
                                <Link component={NextLink} href="/register" underline="hover">
                                    Register here
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </PHForm>
            </Stack>
        </Container>
    );
};

export default LoginPage;
