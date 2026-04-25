module.exports = {
    command: ['flip', 'coin', 'dice', 'rps', 'guess', 'riddle', 'joke'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (commandName === 'flip' || commandName === 'coin') {
            const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ C O I N  F L I P ⚡         ║
╚════════════════════════════════════════════╝

🪙 *Tossing the coin...*

**Result:** ${result}

*The odds decide your fate, mate.* 

*— By the grace of fortune* ⚡

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'dice') {
            const roll = Math.floor(Math.random() * 6) + 1;
            return reply(`╔════════════════════════════════════════════╗
║          ⚡ D I C E  R O L L ⚡         ║
╚════════════════════════════════════════════╝

🎲 *Rolling the dice...*

**Result:** ${roll}

*Your fortune is written, mate.*

"Luck favors the prepared." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'rps') {
            const choices = ['Rock', 'Paper', 'Scissors'];
            const botChoice = choices[Math.floor(Math.random() * choices.length)];
            const userChoice = text ? text.toLowerCase() : 'rock';

            let result = '';
            if (userChoice.includes('rock')) {
                result = botChoice === 'Rock' ? 'Draw!' : botChoice === 'Paper' ? 'You lose!' : 'You win!';
            } else if (userChoice.includes('paper')) {
                result = botChoice === 'Paper' ? 'Draw!' : botChoice === 'Scissors' ? 'You lose!' : 'You win!';
            } else if (userChoice.includes('scissors')) {
                result = botChoice === 'Scissors' ? 'Draw!' : botChoice === 'Rock' ? 'You lose!' : 'You win!';
            } else {
                return reply('*⚠️ Choose: rock, paper, or scissors!*');
            }

            return reply(`╔════════════════════════════════════════════╗
║    ⚡ R O C K  P A P E R  S C I S S O R S ⚡║
╚════════════════════════════════════════════╝

🤜 *Your Choice:* ${userChoice.toUpperCase()}
🤖 *Bot Choice:* ${botChoice}

**${result}**

"The best strategy beats luck." — Tommy Shelby

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'guess') {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            return reply(`╔════════════════════════════════════════════╗
║         ⚡ N U M B E R  G U E S S ⚡    ║
╚════════════════════════════════════════════╝

🎯 *Guess the number!*

I'm thinking of a number between 1-100.
.guess <number>

*Predict like a strategist, mate.* 🧠

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'riddle') {
            const riddles = [
                { q: 'What has hands but cannot clap?', a: 'A clock' },
                { q: 'What gets wetter the more it dries?', a: 'A towel' },
                { q: 'What question can you never answer yes to?', a: 'Are you asleep?' },
                { q: 'What building has the most stories?', a: 'A library' },
                { q: 'What can travel around the world while staying in a corner?', a: 'A stamp' },
            ];
            const riddle = riddles[Math.floor(Math.random() * riddles.length)];

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ R I D D L E ⚡             ║
╚════════════════════════════════════════════╝

❓ ${riddle.q}

*Think like the Shelbys, mate.*
*Answer with: .riddle answer*

"Intelligence is the sharpest blade." 

╔════════════════════════════════════════════╗`);
        }

        if (commandName === 'joke') {
            const jokes = [
                { setup: 'Why did the Peaky Blinder bring a ladder?', punchline: 'To reach new heights of power!' },
                { setup: 'How many Peaky Blinders does it take?', punchline: 'None - they just order someone to do it!' },
                { setup: 'What\'s a Peaky Blinder\'s favorite drink?', punchline: 'A strong strategy with a whiskey chaser!' },
                { setup: 'Why don\'t Peaky Blinders play hide and seek?', punchline: 'Good luck hiding from them!' },
                { setup: 'What did Tommy say about modern technology?', punchline: 'It\'s alright, but nothing beats a sharp blade!' },
            ];
            const joke = jokes[Math.floor(Math.random() * jokes.length)];

            return reply(`╔════════════════════════════════════════════╗
║          ⚡ J O K E  T I M E ⚡       ║
╚════════════════════════════════════════════╝

😄 *${joke.setup}*

_${joke.punchline}_

*— The Garrison's stand-up routine* 🎪

╔════════════════════════════════════════════╗`);
        }
    }
};
