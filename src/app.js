import React from 'react'
import AsyncLoad from "./components/AsyncLoad/AsyncLoad"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const loader = () => import("./components/LazyLoad/LazyLoadBig")

class App extends React.Component {
  state = {
    buttonText: "this button loads an inline dynamic chunk",
    loadAsync: false
  }
  buttonClickHandler = () => {
    import("./components/LazyLoad/LazyLoadSmall")
      .then(LazyLoad => {
        this.setState({ buttonText: LazyLoad.default })
      })
      .catch(err => {
        console.error(err);
      });
  }
  LoadAsyncHandler = () => {
    this.setState({ loadAsync: true })
  }

  componentDidMount() {

  }

  render() {
    const { loadAsync } = this.state;
    return (
      <div>
        <div>This is a React App</div>
        <button onClick={this.buttonClickHandler}>{this.state.buttonText}</button>
        <button onClick={this.LoadAsyncHandler}>This button loads a dynamic async component</button>
        {loadAsync ? <AsyncLoad loader={loader} /> : <div>not attempted load yet</div>}
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/users/">Users</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
          </div>
        </Router>
      </div>

    )
  }
}

export default App