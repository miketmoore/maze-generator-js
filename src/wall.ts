export class Wall {
  private solid = true
  public static new = () => new Wall()
  public carve = () => (this.solid = false)
  public isSolid = () => this.solid
}
