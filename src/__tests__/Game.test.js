import Game from '../js/Game.js';
import '@testing-library/jest-dom';

document.body.innerHTML = `
  <div class="hole" id="hole1"></div>
  <div class="hole" id="hole2"></div>
  <div class="hole" id="hole3"></div>
  <div class="hole" id="hole4"></div>
  <div class="hole" id="hole5"></div>
  <div class="hole" id="hole6"></div>
`;

test('Game.getId()', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.6;
  global.Math = mockMath;

  const game = new Game('hole');
  const result = game.getId();

  expect(result).toBe(9);
});

test('Game.getId() 10 matches', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.6;
  global.Math = mockMath;

  expect(() => {
    const game = new Game('hole');
    const result = game.getId();
    game.getId();
  }).toThrow(new Error('Something wrong! 10 matches!'));
});

test('Game.changeHole()', () => {
  const domElements = document.querySelectorAll('.hole');
  const game = new Game('hole');

  jest.useFakeTimers();
  let spy = jest.spyOn(game, 'getId').mockImplementation(() => 3);

  game.changeHole();
  jest.runOnlyPendingTimers();
  let result = domElements[3].className;

  expect(result).toBe('hole gobin_in_hole');

  spy = jest.spyOn(game, 'getId').mockImplementation(() => 1);
  game.changeHole();
  jest.runOnlyPendingTimers();

  result = domElements[3].className;

  expect(result).toBe('hole');
});
