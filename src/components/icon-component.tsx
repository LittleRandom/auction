import { useState } from "react";

interface IconComponentProps {
    image_url?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ image_url }) => {
    const [imageError, setImageError] = useState(false);

    const fallbackSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M20.4 14.5L16 10 4 20"></path>
        </svg>
    );

    if (!image_url || imageError) {
        return fallbackSvg;
    }

    return (
        <img
            src={image_url}
            alt="Icon"
            className="icon"
            onError={() => setImageError(true)}
        />
    );
};

export default IconComponent;