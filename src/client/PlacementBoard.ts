import Position from '../common/Position'
import Point from './Point'
import Cell from './Cell'
import Rect from './Rect'
import Grid from './Grid'
import Ship from './Ship'
import ShipSection from '../common/ShipSection'

class PlacementBoard
{
    public rect: Rect
    public grid: Grid
    public showAgenda: boolean
    public ships: Ship[]
    private isReady: boolean

    constructor(outerRect: Rect, grid: Grid, showAgenda: boolean) {
        this.rect = outerRect
        this.grid = grid
        this.showAgenda = showAgenda
        this.ships = []
        this.isReady = false
    }

    mouseMove(point: Point): void {
        this.grid.mouseMove(point);
    }

    mouseClick(point: Point): void {
        this.grid.mouseClick(point);
    }

    mouseDown(point: Point): void {
        this.grid.mouseDown(point);
    }

    mouseUp(point: Point): void {
        this.grid.mouseUp(point);
    }

    getIsReady(): boolean {
        return this.isReady
    }

    setReady(value: boolean): void {
        if (value) {
            for (var r = 0; r < this.grid.rows; r++) {
                for (var c = 0; c < this.grid.cols; c++) {
                    const p = new Position(c, r)
                    const cell = this.grid.getCell(p)
                    cell.setChanged()
                }
            }
        }
        this.isReady = value
    }

    loadShip(ship: Ship): void {
        this.ships.push(ship)
    }

    resetShips(): void {
        this.ships.forEach((ship: Ship) => {
            ship.sections.forEach((section: ShipSection) => {
                this.grid.getCell(section.position).setType(Cell.CELL_TYPE_FOG_OF_WAR)
            })
        })

        this.ships = []
    }

    static getInstance(
        ltPoint: Point,
        width: number,
        gap: number,
        row: number,
        col: number,
        showAgenda: boolean
    ): PlacementBoard {
        // TODO: col,row max value
        const xSt = ltPoint.x + gap
        const ySt = ltPoint.y + gap
        const step = width + gap
        const totalWidth = gap + (step * col)
        const totalHeight = gap + (step * row)

        const cells: Cell[][] = []
        var positionY = 0
        for (var y = ySt; y < ltPoint.y + totalHeight; y += step) {
            var positionX = 0
            const gridRow: Cell[] = []
            for (var x = xSt; x < ltPoint.x + totalWidth; x += step) {
                const ltP = new Point(x, y)
                const pos = new Position(positionX, positionY)
                const rbP = new Point(x + width, y + width)
                const outerRect = new Rect(ltP, rbP)
                gridRow[positionX] = new Cell(outerRect, pos, false, Cell.CELL_TYPE_FOG_OF_WAR, false)
                positionX++
            }
            cells[positionY] = gridRow
            positionY++;
        }

        const grid = new Grid(cells)
        const rbPoint = new Point(ltPoint.x + totalWidth, ltPoint.y + totalHeight)
        const boardOuterRect = new Rect(ltPoint, rbPoint)
        console.log(boardOuterRect)
        const board = new PlacementBoard(boardOuterRect, grid, showAgenda)

        return board;
    }
}

export default PlacementBoard