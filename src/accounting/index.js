const readline = require('readline');

const formatBalance = (value) => {
  const fixed = Number(value).toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  return `${intPart.padStart(6, '0')}.${decPart}`;
};

const parseAmount = (input) => {
  const amount = Number.parseFloat(input);
  return Number.isNaN(amount) ? 0 : amount;
};

const createApp = ({ ask, write }) => async () => {
  let balance = 1000.0;
  let continueFlag = true;

  while (continueFlag) {
    write('--------------------------------');
    write('Account Management System');
    write('1. View Balance');
    write('2. Credit Account');
    write('3. Debit Account');
    write('4. Exit');
    write('--------------------------------');

    const choiceInput = await ask('Enter your choice (1-4): ');
    const choice = Number.parseInt(choiceInput, 10);

    switch (choice) {
      case 1: {
        write(`Current balance: ${formatBalance(balance)}`);
        break;
      }
      case 2: {
        const creditInput = await ask('Enter credit amount: ');
        const creditAmount = parseAmount(creditInput);
        balance += creditAmount;
        write(`Amount credited. New balance: ${formatBalance(balance)}`);
        break;
      }
      case 3: {
        const debitInput = await ask('Enter debit amount: ');
        const debitAmount = parseAmount(debitInput);

        if (balance >= debitAmount) {
          balance -= debitAmount;
          write(`Amount debited. New balance: ${formatBalance(balance)}`);
        } else {
          write('Insufficient funds for this debit.');
        }
        break;
      }
      case 4: {
        continueFlag = false;
        break;
      }
      default: {
        write('Invalid choice, please select 1-4.');
      }
    }
  }

  write('Exiting the program. Goodbye!');
};

const runApp = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
  const write = (line) => console.log(line);

  const app = createApp({ ask, write });
  await app();
  rl.close();
};

if (require.main === module) {
  runApp();
}

module.exports = {
  createApp,
  formatBalance,
  parseAmount,
  runApp,
};
