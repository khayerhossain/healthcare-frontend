import DashboardDrawer from '@/components/DashboardSetup/DashboardDrawer/DashboardDrawer';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <DashboardDrawer>{children}</DashboardDrawer>
        </div>
    );
};

export default DashboardLayout;