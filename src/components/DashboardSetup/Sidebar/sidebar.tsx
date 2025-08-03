"use client";

import {
    Box,
    List,
    ListSubheader,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItems";
import { getUserInfo } from "@/services/auth.services";

const Sidebar = () => {
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const { role } = getUserInfo() as any;
        setUserRole(role);
    }, []);

    const items = drawerItems(userRole as UserRole);

    return (
        <Box
            sx={{
                width: 260,
                height: "100vh",
                bgcolor: "#fff",
                borderRight: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Logo Area */}
            <Box
                component={Link}
                href="/"
                sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #eee",
                }}
            >
                <Image src={assets.svgs.logo} alt="Logo" width={32} height={32} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    HealthCare
                </Typography>
            </Box>

            {/* Navigation */}
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.secondary" }}
                    >
                        Main Navigation
                    </ListSubheader>
                }
                sx={{ px: 1 }}
            >
                {items.map((item, index) => (
                    <SidebarItem key={index} item={item} />
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
