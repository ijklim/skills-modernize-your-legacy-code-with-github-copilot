const { createApp } = require('../index');

const runScenario = async (inputs) => {
  const outputs = [];
  const ask = async (prompt) => {
    outputs.push(prompt.trimEnd());
    return inputs.shift() ?? '';
  };
  const write = (line) => outputs.push(line);
  const app = createApp({ ask, write });
  await app();
  return outputs;
};

describe('COBOL test plan parity', () => {
  test('TC001 View initial balance', async () => {
    const outputs = await runScenario(['1', '4']);
    expect(outputs).toContain('Current balance: 001000.00');
  });

  test('TC002 Credit account with positive amount', async () => {
    const outputs = await runScenario(['2', '50', '4']);
    expect(outputs).toContain('Amount credited. New balance: 001050.00');
  });

  test('TC003 View balance after credit', async () => {
    const outputs = await runScenario(['2', '50', '1', '4']);
    expect(outputs).toContain('Current balance: 001050.00');
  });

  test('TC004 Debit account with sufficient funds', async () => {
    const outputs = await runScenario(['2', '50', '3', '25', '4']);
    expect(outputs).toContain('Amount debited. New balance: 001025.00');
  });

  test('TC005 View balance after debit', async () => {
    const outputs = await runScenario(['2', '50', '3', '25', '1', '4']);
    expect(outputs).toContain('Current balance: 001025.00');
  });

  test('TC006 Attempt to debit more than available balance', async () => {
    const outputs = await runScenario(['2', '50', '3', '25', '3', '2000', '4']);
    expect(outputs).toContain('Insufficient funds for this debit.');
  });

  test('TC007 Debit exact balance amount', async () => {
    const outputs = await runScenario(['2', '50', '3', '25', '3', '1025', '4']);
    expect(outputs).toContain('Amount debited. New balance: 000000.00');
  });

  test('TC008 Credit account with zero amount', async () => {
    const outputs = await runScenario(['3', '1000', '2', '0', '4']);
    expect(outputs).toContain('Amount credited. New balance: 000000.00');
  });

  test('TC009 Debit account with zero amount', async () => {
    const outputs = await runScenario(['3', '1000', '3', '0', '4']);
    expect(outputs).toContain('Amount debited. New balance: 000000.00');
  });

  test('TC010 Enter invalid menu choice', async () => {
    const outputs = await runScenario(['5', '4']);
    expect(outputs).toContain('Invalid choice, please select 1-4.');
  });

  test('TC011 Enter non-numeric choice', async () => {
    const outputs = await runScenario(['a', '4']);
    expect(outputs).toContain('Invalid choice, please select 1-4.');
  });

  test('TC012 Exit the application', async () => {
    const outputs = await runScenario(['4']);
    expect(outputs).toContain('Exiting the program. Goodbye!');
  });

  test('TC013 Multiple operations in sequence', async () => {
    const outputs = await runScenario(['1', '2', '100', '1', '3', '50', '1', '4']);
    expect(outputs).toContain('Current balance: 001000.00');
    expect(outputs).toContain('Amount credited. New balance: 001100.00');
    expect(outputs).toContain('Current balance: 001100.00');
    expect(outputs).toContain('Amount debited. New balance: 001050.00');
    expect(outputs).toContain('Current balance: 001050.00');
  });

  test('TC014 Credit with decimal amount', async () => {
    const outputs = await runScenario(['2', '50', '2', '10.50', '4']);
    expect(outputs).toContain('Amount credited. New balance: 001060.50');
  });

  test('TC015 Debit with decimal amount', async () => {
    const outputs = await runScenario(['2', '50', '2', '10.50', '3', '5.25', '4']);
    expect(outputs).toContain('Amount debited. New balance: 001055.25');
  });

  test('TC016 Attempt debit slightly over balance', async () => {
    const outputs = await runScenario(['2', '50', '2', '10.50', '3', '5.25', '3', '1055.26', '4']);
    expect(outputs).toContain('Insufficient funds for this debit.');
  });
});
