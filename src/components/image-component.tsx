import ImagePlaceholder from "./placeholders/image-placeholder";

interface ImageComponentProps {
    image_url: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ image_url }) => {

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

export default ImageComponent;