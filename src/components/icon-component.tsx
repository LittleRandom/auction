import ImagePlaceholder from "./placeholders/image-placeholder";

interface IconComponentProps {
    image_url?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ image_url }) => {

    const fallbackSvg = (
        <ImagePlaceholder />
    );

    if (!image_url) {
        return fallbackSvg;
    }

    return (
        <img
            src={image_url}
            alt="Icon"
            className="icon"
        />
    );
};

export default IconComponent;