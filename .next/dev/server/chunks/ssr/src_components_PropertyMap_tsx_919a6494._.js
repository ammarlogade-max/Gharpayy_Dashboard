module.exports = [
"[project]/src/components/PropertyMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PropertyMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-ssr] (ecmascript)");
;
;
;
;
const getMarkerColor = (vacantBeds)=>{
    if (vacantBeds === 0) return '#ef4444';
    if (vacantBeds <= 3) return '#f59e0b';
    return '#22c55e';
};
const createMarkerIcon = (vacantBeds, rent)=>{
    const color = getMarkerColor(vacantBeds);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].divIcon({
        className: 'custom-map-pin',
        html: `<div style="
      background:${color};color:#fff;font-size:11px;font-weight:600;
      padding:4px 8px;border-radius:8px;white-space:nowrap;
      box-shadow:0 2px 8px ${color}44;border:2px solid #fff;
      font-family:Inter,sans-serif;letter-spacing:-0.01em;
    ">${rent}</div>
    <div style="width:0;height:0;margin:auto;
      border-left:6px solid transparent;border-right:6px solid transparent;
      border-top:6px solid ${color};
    "></div>`,
        iconSize: [
            80,
            36
        ],
        iconAnchor: [
            40,
            36
        ],
        popupAnchor: [
            0,
            -36
        ]
    });
};
function PropertyMap({ properties, onPropertyClick, center, zoom = 12, className = '' }) {
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize map
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapRef.current || mapInstance.current) return;
        const defaultCenter = center || [
            12.9716,
            77.5946
        ]; // Bangalore
        mapInstance.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].map(mapRef.current, {
            center: defaultCenter,
            zoom,
            zoomControl: false,
            attributionControl: false
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].control.zoom({
            position: 'bottomright'
        }).addTo(mapInstance.current);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(mapInstance.current);
        markersRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(mapInstance.current);
        return ()=>{
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);
    // Update markers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapInstance.current || !markersRef.current) return;
        markersRef.current.clearLayers();
        const validProps = properties.filter((p)=>p.latitude && p.longitude);
        if (validProps.length === 0) return;
        validProps.forEach((p)=>{
            const icon = createMarkerIcon(p.vacantBeds, p.rentRange);
            const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].marker([
                p.latitude,
                p.longitude
            ], {
                icon
            });
            const popupContent = `
        <div style="font-family:Inter,sans-serif;min-width:200px;padding:4px;">
          ${p.photos?.[0] ? `<img src="${p.photos[0]}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />` : ''}
          <div style="font-weight:600;font-size:13px;margin-bottom:2px;">${p.name}</div>
          <div style="font-size:11px;color:#666;margin-bottom:6px;">${p.area || ''}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:600;font-size:14px;">${p.rentRange}</span>
            <span style="font-size:11px;color:${getMarkerColor(p.vacantBeds)};">${p.vacantBeds} beds free</span>
          </div>
          <div style="margin-top:8px;text-align:center;">
            <span style="font-size:11px;color:#f97316;cursor:pointer;font-weight:500;">View Details →</span>
          </div>
        </div>
      `;
            marker.bindPopup(popupContent, {
                closeButton: false,
                maxWidth: 260
            });
            marker.on('popupopen', ()=>{
                const el = marker.getPopup()?.getElement();
                el?.addEventListener('click', ()=>onPropertyClick(p.id));
            });
            markersRef.current.addLayer(marker);
        });
        // Fit bounds
        const bounds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].latLngBounds(validProps.map((p)=>[
                p.latitude,
                p.longitude
            ]));
        mapInstance.current.fitBounds(bounds, {
            padding: [
                40,
                40
            ],
            maxZoom: 14
        });
    }, [
        properties,
        onPropertyClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mapRef,
        className: `w-full h-full ${className}`,
        style: {
            minHeight: 400
        }
    }, void 0, false, {
        fileName: "[project]/src/components/PropertyMap.tsx",
        lineNumber: 123,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=src_components_PropertyMap_tsx_919a6494._.js.map