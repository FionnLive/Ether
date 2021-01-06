import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
	const cmdname: string = args.shift();
	const code: string = args.shift();
	const description: string = args.join(' ');
};

export const name: string = 'submit';
export const requiredArgs: string[] = ['command name', 'code', 'description'];
