module.exports = [
"[project]/src/components/PropertyMap.tsx [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_leaflet_dist_leaflet-src_aa14ce50.js",
  "server/chunks/ssr/src_components_PropertyMap_tsx_919a6494._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/PropertyMap.tsx [app-ssr] (ecmascript)");
    });
});
}),
];