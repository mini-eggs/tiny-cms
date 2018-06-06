export class Content {
  public static format(item: any) {
    const next = { ...item };
    const first = item.values[0];
    const title = item.model.title + " - " + first.text_short || first.text_large || first.date;
    return { ...next, title };
  }
}

export class Model {
  public static format(item: any) {
    return {
      id: item.id,
      title: item.title,
      inputs: item.fields.map((data: any) => ({
        title: data.title,
        type: data.type
      }))
    };
  }
}
