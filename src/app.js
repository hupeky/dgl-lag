import React from 'react'
import AsyncLoad from "./components/AsyncLoad/AsyncLoad"

const loader = () => import("./components/LazyLoad/LazyLoadBig")

class App extends React.Component {
  state = {
    buttonText: "this button loads an inline dynamic chunk",
    loadAsync: false
  }
  buttonClickHandler = () => {
    import("./components/LazyLoad/LazyLoadSmall")
      .then(LazyLoad => {
        this.setState({buttonText: LazyLoad.default })
      })
      .catch(err => {
        console.error(err);
      });
  }
  LoadAsyncHandler = () => {
    this.setState({loadAsync: true })
  }

  componentDidMount() {

  }

  render() {
    const {loadAsync} = this.state;
    return (
      <div>
        <div>This is a React App</div>
        <button onClick={this.buttonClickHandler}>{this.state.buttonText}</button>
        <button onClick={this.LoadAsyncHandler}>This button loads a dynamic async component</button>
        {loadAsync ? <AsyncLoad loader={loader}/> : <div>not attempted load yet</div> }
      </div>

    )
  }
}

export default App