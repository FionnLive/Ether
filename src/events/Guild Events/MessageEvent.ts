import { RunFunction } from '../../interfaces/Event';
import { Message } from 'discord.js';
import { prefix } from '../../../config.json';
import { Command } from '../../interfaces/Command';

export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith(prefix)
	)
		return;
	const args: string[] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ + /g);
	const cmd: string = args.shift().toLowerCase();
	const command: Command = client.commands.get(cmd);
	if (!command) return;
	if (command.requiredArgs && !args[command.requiredArgs.length - 1]) {
		return message.channel.send(
			client.embed(
				{
					title: 'Expected Arguments',
					description: `Please provide the following arguments: ${command.requiredArgs.toString()}`,
				},
				message
			)
		);
	}
	command.run(client, message, args).catch((reason: Error) => {
		message.channel.send(
			client.embed(
				{
					title: `There was an error while running ${cmd}`,
					description: 'Report this issue to FionnLive#0001',
				},
				message
			)
		);
		return client.logger.error(`Command ${cmd}: ${reason}`);
	});
};

export const name: string = 'message';
