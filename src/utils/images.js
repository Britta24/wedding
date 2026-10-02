// Maps filenames from weddingConfig to bundled assets in src/assets/.
const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,svg}', { eager: true, import: 'default' });

export const getImage = (filename) => modules[`../assets/${filename}`] || '';
