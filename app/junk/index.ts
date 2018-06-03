export class Content {
  public static getKey(i: any) {
    switch (true) {
      case i.text_short !== null: {
        return "text_short";
      }
      case i.text_large !== null: {
        return "text_large";
      }
      case i.date !== null: {
        return "date";
      }
      default: {
        throw new Error("Couldn't find key.");
      }
    }
  }

  public static getValue(i: any) {
    return i.text_short || i.text_large || i.date
  }

  public static format(item: any) {
    const next = { ...item };

    next.values = item.values.reduce(
      (t: any, i: any) => ({ ...t, [Content.getKey(i)]: Content.getValue(i) }),
      {}
    );

    return {
      ...next,
      title: next.values[Object.keys(next.values)[0]]
    };
  }
}