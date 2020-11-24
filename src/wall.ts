export class Wall {
  private solid = true
  public carve = () => (this.solid = false)
  public isSolid = () => this.solid
}
