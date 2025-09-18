// Format MongoDB date to "Month Day, Year" (e.g., Sep 17, 2025)
export const formatDate = (mongodbTime) => {
    if (!mongodbTime) return "";
    const date = new Date(mongodbTime);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
};