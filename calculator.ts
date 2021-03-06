type Operation = 'multiply' | 'add' | 'divide';

type Result = string | number;

const calculator = (a: number, b: number, op : Operation): Result => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return 'can\'t divide by 0!';
    return a / b;
  }
  return 'no specified operation';
};

try {
  console.log(calculator(1, 5 , 'divide'));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, error message: ', e.message);
}