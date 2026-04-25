const config = require('../config');

const quotes = [
    "I'm Tommy Shelby. And today, I'm going to kill you. — Tommy Shelby",
    "Intelligence is a very valuable thing, innit, my friend? And usually, it comes far too late. — Tommy Shelby",
    "Those of you who are last will soon be first. And those of you who are downtrodden will rise up. — Tommy Shelby",
    "Everyone is a whore, Grace. We just sell different parts of ourselves. — Tommy Shelby",
    "Lies travel faster than the truth. — Finn Shelby",
    "Men like us, Mr. Shelby, will always be alone. And for what love we get, we have to pay. — Chief Inspector Campbell",
    "Whiskey is good proofing water. It tells you who's real and who isn't. — Tommy Shelby",
    "There is no rest for me in this world. Perhaps in the next. — Tommy Shelby",
    "Good taste is for people who can't afford sapphires. — Tommy Shelby",
    "By order of the Peaky Blinders! — Tommy Shelby",
    "I don't pay for suits. My suits are on the house or the house burns down. — Tommy Shelby",
    "Soldiers, Michael. They fight for their country. Well, I fight for my family. — Tommy Shelby",
    "Big fucks small always, actually. There is a fight going on out there between big and small. Big will always win. — Tommy Shelby",
    "The only way to guarantee peace is by making the prospect of war seem hopeless. — Tommy Shelby",
    "I think, Arthur. That's what I do. I think so you don't have to. — Tommy Shelby",
    "In the end, we all get what we deserve. — Tommy Shelby",
    "You can change what you do, but you can't change what you want. — Tommy Shelby",
    "Conviction introduces emotion, which is the enemy of oratory. — Tommy Shelby",
    "London is just smoke and trouble. — Arthur Shelby",
    "I hunt because I'm a hunting dog. And I think that's why you hunt, too. — Tommy Shelby",
    "The business is family. Everything else is just noise. — Tommy Shelby",
    "When you operate in the grey, you don't have the luxury of principles. — Tommy Shelby",
    "We're not a gang. We're a business. — Tommy Shelby",
    "Small health and mental strength. That's what the Sober and Industrious require. — Tommy Shelby",
    "You can't plan for destiny. — Tommy Shelby",
    "I don't fight for glory. I fight because that's what I am. — Tommy Shelby",
    "A man in peak physical condition can withstand the force of a twelve-pound sledgehammer applied with full force without breaking a bone. But I doubt you could survive what's coming. — Tommy Shelby",
    "I'm not a traitor to my class. I am just a traitor to you. — Tommy Shelby",
    "The devil is in the details, mate. — Tommy Shelby",
    "I need a man who understands the basics. Good taste, a nice suit, sharp knives. — Tommy Shelby",
];

module.exports = {
    command: ['quote', 'shelby', 'tommy'],
    async execute(ctx) {
        const { reply } = ctx;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        await reply(`
╔════════════════════════════════════════════╗
║         ⚡ W I S D O M  O F  T H E ⚡      ║
║        P E A K Y  B L I N D E R S           ║
╚════════════════════════════════════════════╝

❝ ${randomQuote} ❞

*— The Peaky Blinders Gazette* 📰
*By the grace of Thomas Shelby* 👑

╔════════════════════════════════════════════╗
        `.trim());
    }
};
