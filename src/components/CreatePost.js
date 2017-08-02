import React, { Component } from 'react';

class CreatePost extends Component {

  constructor(props){
    super(props)

    this.state = {
      blog: "",
      name: "",
      title: ""
    }

    this.addToList = this.addToList.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleBlog = this.handleBlog.bind(this)
  }

  handleName(event){
    this.setState({name: event.target.value})
    console.log('yo')
  }

  handleTitle(event){
    this.setState({title: event.target.value})
    console.log('yo')
  }

  handleBlog(event){
    this.setState({blog: event.target.value})
    console.log('yo')
  }

  addToList = (e) => {

      e.preventDefault();

      this.setState({blog: e.target.value, name: e.target.value, title: e.target.value})

      let blogs = JSON.stringify(this.state)

      fetch("https://tiny-lasagna-server.herokuapp.com/collections/blogger/", {
        method: "POST",
        body: blogs,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }
    )
    .then(response => {
      console.log(response, "yay")

    })
    .catch(err => {
      console.log(err, "boo!")
    })
    this.setState({blog: '', name: '', title: ''})
    this.props.history.push('/')
  }

  render() {

    return (

      <div className="container-fluid">

        <h1 className="container-fluid latest-blog"> Create Blog </h1>

        <div className="container-fluid jumbotron jumbo-form">

          <form className="form-group my-2 my-lg-0" onSubmit={this.addToList}>

            <div className="form-group col-4">
              <label htmlFor="formGroupExampleInput"> Name: </label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Steve" onChange={this.handleName} value={this.state.name}/>
            </div>

            <div className="form-group col-4">
              <label htmlFor="formGroupExampleInput2"> Title: </label>
              <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="omelette du fromage" onChange={this.handleTitle} value={this.state.title} />
            </div>

            <div className="form-group col-4">
              <label htmlFor="textarea">Thoughts:</label>
              <textarea className="form-control" id="textarea" rows="5" onChange={this.handleBlog} value={this.state.blog}></textarea>
            </div>

            <div className="form-group col-4">
              <button type="submit" className="btn btn-outline-success">submit</button>
            </div>

          </form>

        </div>

      </div>
    )
  }
}

export default CreatePost;
