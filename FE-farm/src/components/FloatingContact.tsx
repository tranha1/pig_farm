import { Phone, Facebook } from "lucide-react";

const FloatingContact = () => {
    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
            {/* Phone Button */}
            <a
                href="tel:+84123456789"
                className="bg-primary text-primary-foreground p-3 rounded-r-lg shadow-lg hover:bg-primary/90 transition-colors duration-300 group"
                title="Gọi điện thoại"
            >
                <Phone className="w-6 h-6" />
            </a>

            {/* Facebook Button */}
            <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-r-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 group"
                title="Facebook"
            >
                <Facebook className="w-6 h-6" />
            </a>
        </div>
    );
};

export default FloatingContact;