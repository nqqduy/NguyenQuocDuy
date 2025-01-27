export abstract class BaseModel<Entity> {
  public abstract toEntity(): Entity;
  public abstract toJSON(): Record<string, any>;
}
