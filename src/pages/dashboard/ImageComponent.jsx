import { useState, useEffect, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2, Minimize2 } from "lucide-react";
import { axChecker, axMaker } from "../../config/axios.config";// your axios instance

const ImageComponent = ({
  jsonInput,
  setJsonInput,
  setIsValidJson,
  jsonPath,
  imageJson
}) => {
  /* ---------------- IMAGE STATE ---------------- */

  const imagePaths = imageJson?.details?.image_paths || [];

  const [imagesBase64, setImagesBase64] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
const viewerRef = useRef(null);

  /* ---------------- VIEWER STATE ---------------- */

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  /* ---------------- FETCH IMAGES ---------------- */

  const fetchAllImages = useCallback(async (paths) => {
    if (!paths.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("secondAuthToken");
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const storedProject = JSON.parse(localStorage.getItem("selectedProject") || "{}");

      const results = await Promise.all(
        paths.map(async (filePath) => {
          const response = await axChecker.post(
            "/checker/download_file/",
            {
              file_name: filePath,
              project_id: storedProject.id,
              user_id: profile.user_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
console.log("res:",response);

          if (response.data?.details?.base64_file) {
            return response.data.details.base64_file;
          }
          return null;
        })
      );

      const validImages = results.filter(Boolean);
      setImagesBase64(validImages);

      if (validImages.length > 0) {
        setActiveIndex(0);
        setImageUrl(`data:image/jpeg;base64,${validImages[0]}`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }, []);
   const handleWheel = useCallback((e) => {
  e.preventDefault();

  if (e.deltaY < 0) {
    setZoom((z) => Math.min(z + 0.2, 5));
  } else {
    setZoom((z) => Math.max(z - 0.2, 1));
  }
}, []);

  useEffect(() => {
    if (imagePaths.length > 0) fetchAllImages(imagePaths);
  }, [imageJson]);
useEffect(() => {
  const viewer = viewerRef.current;
  if (!viewer) return;

  viewer.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    viewer.removeEventListener("wheel", handleWheel);
  };
}, [handleWheel]);

  /* ---------------- IMAGE SWITCH ---------------- */

  const changeImage = (index) => {
    setActiveIndex(index);
    setImageUrl(`data:image/jpeg;base64,${imagesBase64[index]}`);

    // Reset view
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  /* ---------------- ZOOM ---------------- */

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));

 

  /* ---------------- DRAG ---------------- */

  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const onMouseUp = () => setIsDragging(false);

  /* ---------------- ROTATE ---------------- */

  const rotate = () => setRotation((r) => r + 90);

  /* ---------------- DOWNLOAD ---------------- */

  const handleDownload = () => {
    if (!imagesBase64.length) return;

    const base64 = imagesBase64[activeIndex];
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${base64}`;
    link.download = `image_${activeIndex + 1}.jpg`;
    link.click();
  };

  /* ---------------- RENDER ---------------- */

  if (isLoading) return <div className="p-6">Loading images...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className={`glass-card h-full flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>

      {/* TOOLBAR */}
      <div className="flex gap-2 p-3 border-b">
        <button className="btn" onClick={zoomIn}><ZoomIn size={16} /></button>
        <button className="btn" onClick={zoomOut}><ZoomOut size={16} /></button>
        <button className="btn" onClick={rotate}><RotateCw size={16} /></button>
        <button className="btn" onClick={handleDownload}><Download size={16} /></button>
        <button className="btn" onClick={() => setIsFullscreen(!isFullscreen)}>
          {isFullscreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
        </button>
      </div>

      {/* IMAGE VIEWER */}
      <div
  ref={viewerRef}
  className="flex-1 overflow-hidden flex items-center justify-center cursor-grab"
  onMouseMove={onMouseMove}
  onMouseUp={onMouseUp}
  onMouseLeave={onMouseUp}
>

        {imageUrl && (
          <img
            src={imageUrl}
            onMouseDown={onMouseDown}
            className="select-none"
            style={{
              transform: `
                translate(${position.x}px, ${position.y}px)
                scale(${zoom})
                rotate(${rotation}deg)
              `,
              transition: isDragging ? "none" : "transform 0.2s",
              maxHeight: "90%",
              maxWidth: "90%",
            }}
            alt="document"
          />
        )}
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 p-3 overflow-x-auto border-t">
        {imagesBase64.map((img, index) => (
          <button
            key={index}
            onClick={() => changeImage(index)}
            className={`h-16 w-24 border-2 rounded ${
              activeIndex === index ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={`data:image/jpeg;base64,${img}`}
              className="h-full w-full object-cover"
              alt="thumb"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageComponent;
