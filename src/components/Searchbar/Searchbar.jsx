import React, { Component } from 'react'
import SearchForm from './SearchForm/SearchForm';
import { searchImages } from 'components/api/post';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import styles from "./searchbar.module.scss";

export default class Searchbar extends Component {
    state = {
        items: [],
        loading: false,
        error: null,
        search:"",
      page: 1,
      isVisible: false,
      isEmpty:true,
      modalOpen: false,
      largeImageURL: "",
  }

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    // if ((search && prevState.search !== search) ||
    //   page > prevState.page)
    if (prevState.search !== search || prevState.page !== page) {
        this.featchImage(search, page);
      }
  };

  async featchImage() {
  
    const { search, page } = this.state;
    if (!search) {
      return;
    }
        this.setState({
            loading:true,
        })

        try {
          const data = await searchImages(search, page);

          this.setState(prevState => {
            return {
              items: [...prevState.items, ...data.hits],
              isVisible: this.state.page < Math.ceil(data.total/12),
            }
          })

        } catch (error) {
            this.setState({
                error
            })
        } finally {
            this.setState({
            loading:false,
        })
        }
    }


   onSearch = ({ search }) => {
        this.setState({
          search: search,
          page: 1,
          items: [],
          isEmpty: false,
        })
  }

  openModal = (largeImageURL) => {
    this.setState({
      modalOpen: true,
      largeImageURL: largeImageURL,
    })
  }
  
  closeModal = () => {
    this.setState({
      modalOpen: false,
      // modalContent: {
      //   modalContent:"",
      // }
  })
}

  
  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      }
    })
  }

    render() {
      const { items, loading, error,modalOpen,largeImageURL,isEmpty } = this.state;
      const { onSearch,closeModal,openModal } = this;
      const isImage = Boolean(items.length);
      return (
        <>
            <div className={styles.Searchbar}>
            <SearchForm onSubmit={onSearch} />
          </div>
          {isEmpty && <h2> They are no image...</h2> }
          {modalOpen && <Modal onClose={closeModal}>
              <img src={largeImageURL.largeImageURL} alt="foto cat" ></img>
            </Modal>}
            {loading && <Loader />}
            {error && <p>Будь ласка спробуйте пізніе!</p>}
          {isImage && <ImageGallery items={items} onClick={openModal} />}
          {this.state.isVisible && <button onClick={this.onLoadMore} className={styles.loadMore}>Load more</button>}
          </>
    )
  }
}
