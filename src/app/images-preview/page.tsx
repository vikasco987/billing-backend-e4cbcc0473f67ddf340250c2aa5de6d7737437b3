// "use client";

// import { useEffect, useState } from "react";

// export default function ImagesPreview() {
//   const [images, setImages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const res = await fetch("/api/images/list");
//         const data = await res.json();
//         setImages(data.images || []);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     };

//     loadImages();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Image Database Preview</h1>

//       {loading && <p>Loading images...</p>}

//       {!loading && images.length === 0 && (
//         <p>No images found in Image DB.</p>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <div key={img._id} className="border rounded p-2 text-center">
//             <img
//               src={img.image_url}
//               alt={img.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <p className="mt-2 font-semibold">{img.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";

// export default function ImagesPreview() {
//   const [images, setImages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadImages() {
//       try {
//         const res = await fetch("/api/images/list", { cache: "no-store" });
//         const data = await res.json();

//         console.log("📸 Image Preview API Response:", data);

//         setImages(data.images || []);
//       } catch (err) {
//         console.error("❌ Error loading images:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadImages();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Image Database Preview</h1>

//       {loading && <p>Loading images...</p>}

//       {!loading && images.length === 0 && (
//         <p className="text-red-500">No images found in Image DB.</p>
//       )}

//       {/* Image Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img: any) => (
//           <div
//             key={img._id}
//             className="border rounded shadow-sm p-2 bg-white text-center"
//           >
//             <img
//               src={img.image_url}
//               alt={img.title}
//               className="w-full h-32 object-cover rounded"
//               onError={(e) => {
//                 e.currentTarget.src =
//                   "https://via.placeholder.com/150?text=No+Image";
//               }}
//             />
//             <h2 className="text-sm font-semibold mt-2">{img.title}</h2>
//             <p className="text-xs text-gray-500">{img.category}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";

// export default function ImagesPreviewPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetch("/api/images/list");
//         const data = await res.json();

//         setImages(data.images || []);
//       } catch (err) {
//         console.error("Error loading images:", err);
//       }
//       setLoading(false);
//     }

//     load();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Image Database Preview</h2>

//       {loading && <p>Loading...</p>}
//       {!loading && images.length === 0 && (
//         <p>No images found in Image DB.</p>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <div key={img._id} className="border p-2 rounded">
//             <img
//               src={img.image_url}
//               alt={img.title}
//               className="w-full h-32 object-cover rounded"
//             />
//             <p className="text-sm mt-2">{img.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









"use client";

import { useEffect, useState } from "react";

export default function ImagesPreviewPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/images/list");
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Image Database Preview</h1>

      {loading && <p>Loading...</p>}

      {!loading && images.length === 0 && (
        <p>No images found in Image DB.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="p-2 border rounded">
            <img
              src={img.image_url}
              className="w-full h-40 object-cover"
              alt={img.title}
            />
            <p className="mt-2 text-sm font-semibold">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
