import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import FirebaseDBViewer from "./components/FirebaseDBViewer";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<p className="App-intro">
					To get started, edit <code>.env </code> with the
					corresponding firebase credentials. the Root content of
					database will show below
				</p>
				<FirebaseDBViewer />
			</div>
		);
	}
}

export default App;
