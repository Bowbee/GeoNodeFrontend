import React from 'react';
import { Socket } from 'socket.io-client';
import '../css/button.scss';

type Props = {
	buttonId: string,
	uid: string,
	children?: React.ReactNode,
	height: string,
	width: string,
	socket: Socket,
}

const clickHandler = (socket: Socket, uid: string, buttonId: string) => {
	socket.emit('buttonPress', { uid: uid, buttonId: buttonId });
	console.log(`Button ${buttonId} pressed.`);
}

const Button: React.FC<Props> = ({
	buttonId,
	uid,
	children,
	height,
	width,
	socket,
}) => {
	return (
		<button
			className="push--skeuo"
			onClick={() => {clickHandler(socket, uid, buttonId)}}
			style={{
				height,
				width
			}}
		>
			{children}
		</button>
	);
}

export default Button;