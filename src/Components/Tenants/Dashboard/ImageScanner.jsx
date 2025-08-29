import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scanWasteImage,
  resetScanState,
} from "../../../Features/Slices/User/ImageScanSlice";

export default function ImageScanner() {
  const dispatch = useDispatch();
  const { loading, reply, error } = useSelector((state) => state.imageScan);
  const [previewUrl, setPreviewUrl] = useState("");
  const [rawBase64, setRawBase64] = useState("");

  const onFileChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      dispatch(resetScanState());

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreviewUrl(result);
          const commaIdx = result.indexOf(",");
          const base64Raw = commaIdx >= 0 ? result.slice(commaIdx + 1) : result;
          setRawBase64(base64Raw);
        }
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  const onScan = useCallback(() => {
    if (!rawBase64) return;
    dispatch(scanWasteImage(rawBase64));
  }, [dispatch, rawBase64]);

  const result = useMemo(() => reply || {}, [reply]);

  return (
    <div className="md:min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Waste Image Scanner
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Upload + Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:font-semibold file:bg-green-100 
                file:text-green-700 hover:file:bg-green-200 cursor-pointer"
            />

            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}

            <button
              onClick={onScan}
              disabled={!rawBase64 || loading}
              className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-lg 
                bg-green-600 px-5 py-2.5 text-white font-semibold 
                hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Scanning..." : "Scan Image"}
            </button>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Result</h3>
            {!reply && !error && (
              <p className="text-sm text-gray-500">
                Upload an image and click <b>Scan</b> to view results.
              </p>
            )}

            {error && (
              <div className="text-red-600 text-sm border border-red-200 bg-red-50 rounded-lg p-3">
                {String(error)}
              </div>
            )}

            {reply && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Item Type</span>
                  <span className="font-semibold">
                    {result.item_type || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prediction</span>
                  <span className="font-semibold">
                    {result.prediction || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mixture</span>
                  <span className="font-semibold">{result.mixture || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Penalty</span>
                  <span
                    className={`font-semibold ${
                      result.penalty === "true" || result.penalty === true
                        ? "text-red-600"
                        : "text-green-700"
                    }`}
                  >
                    {String(result.penalty ?? "-")}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600 block mb-1">
                    Detected Items
                  </span>
                  <ul className="list-disc pl-6 text-sm text-gray-800">
                    {(result.items || []).map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
