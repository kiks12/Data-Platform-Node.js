
class Validator {
  constructor() {}

  nullCheckImages(images) {
    let isNull = false;

    for (const image of images) {
      if (image.label === null) {
        isNull = true
        break
      } 

      isNull = false
    }

    return isNull
  }
}