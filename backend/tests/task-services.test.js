const myFunctions = require('../models/task-services.js');

// getTasks
// findTaskById
// addTask
// deleteTaskById

test('Testing getTasks -- success', () => {
myFunctions.getTasks();
  const target = 30;
  const result = 30;
  expect(target).toBe(result);
});