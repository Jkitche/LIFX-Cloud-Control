import React, { Component } from 'react';
import lifx from 'lifx-http-api';
import config from '../config.json';
import './App.css';

const lifxClient = new lifx({
	bearerToken: config.token,
});

class App extends Component {
	state = {
		lights: [],
	};

	componentDidMount() {
		this.updateLightList();
	}

	updateLightList = () => {
		lifxClient.listLights('all').then((data) => {
			this.setState({
				lights: data,
			});
		});
	}

	togglePower = (id) => {
		lifxClient.togglePower(`id:${id}`, 0, (err, data) => {
			this.state.lights.forEach((light) => {
				if (light.id === id) {
					light.power = light.power == 'on' ? 'off' : 'on';
				}
			});
			this.forceUpdate();
		});
	}

	render() {
		if (!this.state.lights.length) return null;

		const lights = this.state.lights.map((light) => {
			const powerButton = (
				<a href="#" onClick={() => { this.togglePower(light.id); }}>{light.power}</a>
			);

			return (
				<li key={light.id}>
					<h3>{light.label}</h3>
					<h4>Status: {powerButton}</h4>
					<h4>Color: {light.color.hue} | {light.color.saturation} | {light.color.kelvin}</h4>
				</li>
			)
		})

		return (
			<div>
				<ul id="lightList">
					{lights}
				</ul>
			</div>
		);
	}
}

export default App;
