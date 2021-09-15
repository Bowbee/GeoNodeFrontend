import React, { Component } from "react";
import "react-nipple/lib/styles.css";
import ReactNipple from "react-nipple";
import { Socket } from "socket.io-client";
import config from "../config";

type JoystickProps = {
	title: String,
	options: any
	socket: Socket,
	uid: String,
	height: String,
}

type JoystickState = {
	isActive: boolean,
	data: any,
}

export default class JoystickArea extends Component<JoystickProps, JoystickState> {
	state = {
		isActive: false,
		data: undefined
	};
	render() {
		return (
			<ReactNipple
				className="joystick"
				options={this.props.options}
				style={{
					outline: `1px dashed ${this.props.options.color}`,
					width: "100%",
					height: this.props.height
				}}
				onStart={this.handleJoystickStart}
				onEnd={this.handleJoystickEnd}
				onMove={this.handleJoystickMove}
			/>
		);
	}

	handleJoystickStart = (evt: any, data: any) => {
		if (config.verbose) console.log('Started');
		this.setState({ isActive: true });
		this.props.socket.emit('isActive', { uid: this.props.uid, isActive: true });
	};
	handleJoystickEnd = (evt: any, data: any) => {
		if (config.verbose) console.log('Stopped');
		this.setState({ isActive: false });
		this.props.socket.emit('isActive', { uid: this.props.uid, isActive: false });
	};
	handleJoystickMove = (evt: any, data: any) => {
		if (config.verbose) console.log(data);
		//this.setState({ data: { uid: this.props.uid,	identifier: data.identifier, angle: data.angle, distance: data.distance, pressure: data.pressure, force: data.force} });
		this.props.socket.emit('movement', { uid: this.props.uid,	identifier: data.identifier, angle: data.angle, distance: data.distance, pressure: data.pressure, force: data.force} );

	};
}