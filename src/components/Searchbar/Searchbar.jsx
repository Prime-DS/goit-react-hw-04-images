import React, { useState,useEffect } from 'react'
import SearchForm from './SearchForm/SearchForm';
// import { searchImages } from 'components/api/post';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import styles from "./searchbar.module.scss";
import axios from 'axios';

export default function Searchbar() {
  const [items,setItems]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("")
  
useEffect(() => {
  if(search) { 
    setLoading(true)   
    featchImage(search, page).then(response => {
      setItems(prev => [...prev, ...response]); 
   })
   .catch(error => console.log(error))
   .finally(setLoading(false))
  }
}, [search, page]);

  const onSearch = (search)  => {
    setItems([])
    setSearch(search)
    setPage(1)
    // setIsEmpty(true)
};


const KEY_API = '29398467-8a653d7b4fed816ab704a6050';
  const featchImage = async(search,page)=> {
        try {
          const response = await axios.get(
            `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
          );
          // const response = await searchImages(search, page);
          return response.data.hits;
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
    };


  

  const openModal = (largeImg ) => {
    setModalOpen(true);
    setLargeImageURL(largeImg )
  }
  
  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL("")
}

  const onLoadMore = () => {
    setPage((prevState) => {
      return prevState + 1})
  }

    
      const isImage = Boolean(items.length);


      return (
        <>
            <div className={styles.Searchbar}>
            <SearchForm onSubmit={onSearch} />
          </div>
          {isEmpty && <h2> They are no image...</h2> }
          {modalOpen && <Modal onClose={closeModal}>
              <img src={largeImageURL} alt="foto cat" ></img>
            </Modal>}
            {loading && <Loader />}
            {error && <p>Будь ласка спробуйте пізніе!</p>}
          {isImage && <ImageGallery items={items} onClick={openModal} />}
          {isVisible && <button onClick={onLoadMore} className={styles.loadMore}>Load more</button>}
          </>
    )
  
}
