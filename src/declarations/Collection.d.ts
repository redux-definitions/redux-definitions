interface ICollection<T extends INormalizable> {
  entities: {
    [k: string]: T;
  };
  ids: T['id'];
}
