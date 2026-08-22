import React, { useState } from "react";

function AppImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  onClick,
  fallbackSrc = "/assets/images/no_image.png",
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const commonClassName = `${className} ${isLoading ? "bg-neutral-900" : ""} ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`;

  const imgStyle = {};
  if (width && !fill) imgStyle.width = width;
  if (height && !fill) imgStyle.height = height;

  if (fill) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: width || "100%", height: height || "100%" }}
      >
        <img
          src={imageSrc}
          alt={alt}
          className={`${commonClassName} absolute inset-0 w-full h-full object-cover`}
          onError={handleError}
          onLoad={handleLoad}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={commonClassName}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      style={imgStyle}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}

export default AppImage;
