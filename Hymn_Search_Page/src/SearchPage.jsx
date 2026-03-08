import { useMemo, useState } from "react";
import imageData from "./data/images.json";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function SearchPage() {
  const [activeTab, setActiveTab] = useState("MK");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return imageData.filter((image) => {
      const matchesCategory = image.category === activeTab;

      const matchesSearch =
        !term ||
        image.imageName.toLowerCase().includes(term) ||
        image.fileName.toLowerCase().includes(term) ||
        image.imageNumber.toString().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="search-page min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="card main-card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="display-6 fw-bold mb-2">Kachin Hymnbook</h1>
                  <p className="text-muted mb-0">
                    Search by image name or file number
                  </p>
                </div>

                <div className="search-box mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search: MK12, H7, 45, MK45.JPG..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ul className="nav nav-pills justify-content-center mb-4">
                  <li className="nav-item me-2">
                    <button
                      className={`nav-link tab-btn ${
                        activeTab === "MK" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("MK")}
                    >
                      Shakawn Mahkawn
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link tab-btn ${
                        activeTab === "H" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("H")}
                    >
                      Kahti Galai
                    </button>
                  </li>
                </ul>

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                  <h5 className="mb-0">
                    {activeTab} Images
                  </h5>
                  <span className="badge rounded-pill text-bg-dark px-3 py-2">
                    {filteredImages.length} result{filteredImages.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="row g-4">
                  {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                      <div className="col-sm-6 col-md-4 col-lg-3" key={image.id}>
                        <div className="card image-card h-100 border-0 shadow-sm">
                          <Zoom>
                            <img
                                src={`${import.meta.env.BASE_URL}images/${image.category}/${image.fileName}`}
                                alt={image.imageName}
                                className="img-fluid rounded"
                                style={{
                                cursor: "zoom-in",
                                maxHeight: "220px",
                                objectFit: "cover"
                                }}
                            />
                          </Zoom>
                          <div className="card-body">
                            <h6 className="fw-bold mb-2">{image.imageName}</h6>
                            <p className="mb-1 text-muted small">
                              <strong>Number:</strong> {image.imageNumber}
                            </p>
                            <p className="mb-0 text-muted small">
                              <strong>File:</strong> {image.fileName}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="empty-state text-center py-5">
                        <h5 className="fw-semibold">No images found</h5>
                        <p className="text-muted mb-0">
                          Try another image name or file number.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;