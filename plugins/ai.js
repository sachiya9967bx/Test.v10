module.exports = {
    command: ['ai', 'gpt', 'ask', 'chatgpt', 'openai'],
    async execute(ctx) {
        const { text, reply, commandName } = ctx;

        if (!text) {
            return reply('*⚠️ Ask me something, mate!*\n\nExample: .ai What is your purpose?');
        }

        if (commandName === 'ai' || commandName === 'gpt' || commandName === 'ask' || commandName === 'chatgpt' || commandName === 'openai') {
            // Simulate AI response
            const responses = [
                "Intelligence is a very valuable thing, innit? Here's what I think...",
                "By order of the Peaky Blinders, let me answer that...",
                "Tommy Shelby would say: Think strategically about this...",
                "The Garrison's wisdom speaks: Consider this perspective...",
                "From the mind of a Shelby: Here's my take..."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ A I  R E S P O N S E ⚡       ║
╚════════════════════════════════════════════╝

❓ *Your Question:*
${text}

🤖 *AI Response:*
${randomResponse}

*Note:* This is a simulated response. For real AI interactions, integrate with OpenAI API or similar services.

*"Intelligence, whether artificial or human, is power."* 

— Tommy Shelby 🧠

╔════════════════════════════════════════════╗`);
        }
    }
};
