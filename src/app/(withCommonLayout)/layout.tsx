import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default layout;