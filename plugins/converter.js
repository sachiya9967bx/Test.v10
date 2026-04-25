module.exports = {
    command: ['calc', 'calculator', 'convert', 'tempconvert'],
    async execute(ctx) {
        const { text, args, reply, commandName } = ctx;

        if (commandName === 'calc' || commandName === 'calculator') {
            if (!text) {
                return reply('*⚠️ Example: .calc 5 + 5 or .calc 10 * 2*');
            }

            try {
                // Simple calculator - be careful with eval
                const result = Function(`'use strict'; return (${text})`)();
                
                return reply(`╔════════════════════════════════════════════╗
║       ⚡ C A L C U L A T O R ⚡        ║
╚════════════════════════════════════════════╝

*Expression:* ${text}
*Result:* ${result}

*— The numbers never lie, mate* 🔢

╔════════════════════════════════════════════╗`);
            } catch (err) {
                return reply('*⚠️ Invalid calculation, mate!*\n\nExample: .calc 5 + 5');
            }
        }

        if (commandName === 'convert' || commandName === 'tempconvert') {
            if (args.length < 2) {
                return reply('*⚠️ Usage: .convert <value> <unit>*\n*Example: .convert 100 celsius*');
            }

            const value = parseFloat(args[0]);
            const unit = args[1].toLowerCase();

            let result = '';

            if (unit === 'celsius' || unit === 'c') {
                const fahrenheit = (value * 9/5) + 32;
                result = `${value}°C = ${fahrenheit.toFixed(2)}°F`;
            } else if (unit === 'fahrenheit' || unit === 'f') {
                const celsius = (value - 32) * 5/9;
                result = `${value}°F = ${celsius.toFixed(2)}°C`;
            } else if (unit === 'km') {
                const miles = value * 0.621371;
                result = `${value}km = ${miles.toFixed(2)} miles`;
            } else if (unit === 'miles') {
                const km = value / 0.621371;
                result = `${value} miles = ${km.toFixed(2)}km`;
            } else if (unit === 'kg') {
                const lbs = value * 2.20462;
                result = `${value}kg = ${lbs.toFixed(2)} lbs`;
            } else if (unit === 'lbs') {
                const kg = value / 2.20462;
                result = `${value} lbs = ${kg.toFixed(2)}kg`;
            } else {
                return reply('*⚠️ Unknown unit! Try: celsius, fahrenheit, km, miles, kg, lbs*');
            }

            return reply(`╔════════════════════════════════════════════╗
║         ⚡ C O N V E R T E R ⚡        ║
╚════════════════════════════════════════════╝

${result}

*— Precision is everything in war* ⚖️

╔════════════════════════════════════════════╝`);
        }
    }
};
