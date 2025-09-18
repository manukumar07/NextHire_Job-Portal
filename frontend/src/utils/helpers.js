
export const formatNumber = (num) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

// Framer Motion fade-up animation variants
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};


export const getRandomColor = (name) => {
    const colors = [
        "#1E3A8A",
        "#9CA3AF",
        "#F59E0B",
        "#F9FAFB",
        "#3B82F6",
        "#10B981",
        "#8B5CF6",
        "#F472B6",
    ];

    // Pick color deterministically based on company name
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
};