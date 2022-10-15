import React, { Component } from 'react'

import TextField from 'components/Searchbar/TextField/TextField';
import SubmitButton from '../SubmitButton/SubmitButton';
import { nanoid } from 'nanoid';
import styles from "./searchForm.module.scss";
export default class SearchForm extends Component {
    state = {
        search:"",
  }
    searchField = {
    type: "text",
    name: "search",
    placeholder: "Search images and photos",
    required: true,
  }


  searchId = nanoid();
  
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({...this.state });
    this.reset();
  }

  reset() {
    this.setState({
      search:""
    })
  }
    render() {
      const { search } = this.state;
      const { handleSubmit,searchId,handleChange,searchField} = this;
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
  }
}
