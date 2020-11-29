import { IGrid } from './grid'
import { ICell } from './cell'
import { carveGridFactory, ICarveableGrid } from './carveable-grid'
import { randInRange } from './rand'
import { Direction } from './direction'
import { ICoord } from './coord'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  grid: IGrid,
  strategy: Strategy = 'recursive-backtracking'
) {
  const carveableGrid = carveGridFactory(grid)
  switch (strategy) {
    case 'recursive-backtracking':
      const cell = grid.getRandCell()
      cell.markStart()
      carveRecursiveBacktracking(carveableGrid, [cell])
    case 'iterative':
      carveIterative(carveableGrid)
  }
}

const getOppositeDirection: (direction: Direction) => Direction = direction => {
  if (direction === 'north') {
    return 'south'
  } else if (direction === 'east') {
    return 'west'
  } else if (direction === 'south') {
    return 'north'
  }
  return 'east'
}

function carveRecursiveBacktracking(
  carveableGrid: ICarveableGrid,
  history: ICell[]
): void {
  const cell = history[history.length - 1]

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const availableWalls = carveableGrid.getAvailableCellWalls(
    cell,
    cell.getCoord()
  )

  if (availableWalls.length === 0) {
    if (history.length >= 2) {
      const backtrackedCell = history.pop()
      if (backtrackedCell) {
        backtrackedCell.markPopped()
      }
      carveRecursiveBacktracking(carveableGrid, history)
      return
    }
    return
  }

  const wallIndex = randInRange(0, availableWalls.length)
  const availableWall = availableWalls[wallIndex]
  cell.carveWall(availableWall.direction)

  const adjacentCell = carveableGrid.getAdjacentCell(
    availableWall.direction,
    cell.getCoord()
  )
  if (adjacentCell) {
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(availableWall.direction)
      adjacentCell.carveWall(oppDir)
      history.push(adjacentCell)

      carveRecursiveBacktracking(carveableGrid, history)
    }
  }
}

function carveIterative(grid: ICarveableGrid): void {
  const coord = grid.getGrid().getRandCoord()
  const history = [coord]

  let running = true
  while (running) {
    const coord = history[history.length - 1]
    const cell = grid.getCell(coord)
    if (!cell) {
      throw new Error('cell not found')
    }

    // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
    const availableWalls = grid.getAvailableCellWalls(cell, cell.getCoord())

    if (availableWalls.length === 0) {
      if (history.length >= 2) {
        const backtrackedCoord = history.pop()
        if (!backtrackedCoord) {
          throw new Error('backtracked coord not found')
        }
        const backtrackedCell = grid.getCell(backtrackedCoord)
        if (backtrackedCell) {
          backtrackedCell.markPopped()
        }
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, availableWalls.length)
      const availableWall = availableWalls[wallIndex]
      cell.carveWall(availableWall.direction)

      const adjacentCell = grid.getAdjacentCell(
        availableWall.direction,
        cell.getCoord()
      )
      if (adjacentCell && !adjacentCell.isVisited()) {
        const oppDir = getOppositeDirection(availableWall.direction)
        adjacentCell.carveWall(oppDir)
        history.push(adjacentCell.getCoord())
      }
    }
  }
}
