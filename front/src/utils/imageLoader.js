const imageLoader = ({ src, width, quality }) => {
    return `${src}?q=${quality || 100}`
}

export default imageLoader;