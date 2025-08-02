"use client";

import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography,
    Link,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import assets from "@/assets";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeuserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientRegisterSchema = z.object({
    name: z.string().min(1, "Please enter you name"),
    email: z.string().email("Please enter a valid email"),

    contactNumber: z.string().regex(/^\d{11}$/, "Please enter a valid 11-digit contact number"),
    address: z.string().min(1, "Please enter your address"),

});
export const validationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    patient: patientRegisterSchema,
});

export const defaultValues = {
    password: "",
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: "",
    },
};



const RegisterPage = () => {
    const router = useRouter();

    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values);
        try {
            const res = await registerPatient(data);
            if (res?.data?.id) {
                toast.success("Registration successful!");

                const userRes = await userLogin({
                    password: values.password,
                    email: values.patient.email,
                });

                if (userRes?.data?.accessToken) {
                    storeuserInfo({ accessToken: userRes.data.accessToken });
                    router.push("/");
                }
            }
        } catch (error: any) {
            toast.error("Registration failed!");
            console.error("Error during registration:", error);
        }
    };

    return (
        <Container>
            <Stack justifyContent="center" alignItems="center" minHeight="100vh">
                <Box
                    width="100%"
                    maxWidth={600}
                    boxShadow={1}
                    borderRadius={1}
                    padding={4}
                >
                    {/* Logo & Title */}
                    <Stack spacing={1} justifyContent="center" alignItems="center" mb={2}>
                        <Image
                            src={assets.svgs.logo}
                            width={50}
                            height={50}
                            alt="logo"
                        />
                        <Typography variant="h6" fontWeight={600}>
                            Patient Registration
                        </Typography>
                    </Stack>

                    {/* Form */}
                    <PHForm onSubmit={handleRegister} resolver={zodResolver(validationSchema)}
                        defaultValues={defaultValues}>
                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid>
                                <PHInput
                                    label="Name"
                                    name="patient.name"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Email */}
                            <Grid>
                                <PHInput
                                    label="Email"
                                    name="patient.email"
                                    type="email"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Password */}
                            <Grid>
                                <PHInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Contact Number */}
                            <Grid>
                                <PHInput
                                    label="Contact Number"
                                    name="patient.contactNumber"
                                    type="tel"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Address */}
                            <Grid>
                                <PHInput
                                    label="Address"
                                    name="patient.address"
                                    type="text"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Register Button */}
                            <Grid>
                                <Button type="submit" variant="contained" fullWidth>
                                    Register
                                </Button>
                            </Grid>

                            {/* Login Link */}
                            <Grid>
                                <Typography variant="body2" align="center">
                                    Already have an account?{" "}
                                    <Link component={NextLink} href="/login" underline="hover">
                                        Login here
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </PHForm>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
