import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";

import Articlepage from "./pages/Articlepage/Articlepage";
import Login from "./components/Login/Login";
import Adminpage from "./pages/Adminpage/Adminpage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "./App.css";
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		fetch("/")
			.then((response) => response.json())
			.then((data) => {
				return this.setState({
					posts: data,
				});
			});
	}

	componentWillUnmount() {
		document.cookie =
			"MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}

	render() {
		return (
			<div className="App">
				<Navbar />
				<Switch>
					<Route component={Homepage} path="/" exact />
					<Route component={Homepage} path="/jee" />
					<Route component={Homepage} path="/programming" />
					<Route component={Homepage} path="/lifelogs" />
					{this.state.posts.map((i, j) => {
						return (
							<Route component={Articlepage} path={`/${i.link}`} key={j} />
						);
					})}
					<Route component={Login} path="/login" />
					<Route path="/admin" component={Adminpage} />
					<Route component={PageNotFound} path="*" />
				</Switch>
			</div>
		);
	}
}
export default App;
