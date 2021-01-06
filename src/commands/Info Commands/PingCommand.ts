import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message) => {
	const msg: Message = await message.channel.send(
		client.embed({ title: 'Pinging...' }, message)
	);
	msg.edit(
		client.embed(
			{
				title: 'Pinged!',
				description: `Message Edit Ping: ${
					msg.createdTimestamp - message.createdTimestamp
				}ms!\nWebsocket Ping: ${client.ws.ping}ms!`,
			},
			message
		)
	);
};

export const name: string = 'ping';
