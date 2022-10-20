import { useState } from 'react'

import TextField from 'components/Gallery/TextField/TextField';
import SubmitButton from '../SubmitButton/SubmitButton';
import { nanoid } from 'nanoid';
import styles from "./searchForm.module.scss";

export default function SearchForm ({onSubmit}) {

  const [search, setSearch] = useState('')
  //   state = {
  //       search:"",
  // }
    const searchField = {
    type: "text",
    name: "search",
    placeholder: "Search images and photos",
    required: true,
  }


  const searchId = nanoid();
  
  const handleChange = (e) => {
    // const { value } = e.target;
    setSearch(e.target.value)
    // this.setState({
    //   [name]: value
    // })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { onSubmit } = this.props;
    onSubmit(search);
    // this.reset();
    setSearch('')
  }

  // reset() {
  //   this.setState({
  //     search:""
  //   })
  // }
    // render() {
    //   const { search } = this.state;
    //   const { handleSubmit,searchId,handleChange,searchField} = this;
    return (
      <form onSubmit={handleSubmit} className={styles.SearchForm} >
        <SubmitButton
          text="Search"
          onClick={handleSubmit}
        />
        <TextField
          value={search}
          id={searchId}
          handleChange={handleChange}
          {...searchField}
        />
      </form>
    )
  // }
}
