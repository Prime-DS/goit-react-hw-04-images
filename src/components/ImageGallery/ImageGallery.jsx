import styles from "./ImageGallery.module.scss";

const ImageGallery = ({ items, onClick }) => {
    const elements = items.map(({ id, webformatURL,largeImageURL }) =>
        <li className={styles.ImageGalleryItem} key={id} onClick={() => onClick({ largeImageURL })}
            >
            <img className={styles.ImageGalleryItemImage} src={webformatURL} alt="foto cat" ></img>
        </li>);
    return <ul className={styles.ImageGallery}>{elements} </ul>
}

export default ImageGallery;
