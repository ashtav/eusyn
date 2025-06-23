interface Image {
    /*
        * Changes the quality of the image.
        * @param base64 - The base64 encoded image string.
        * @param quality - The quality level (0-100).
        * @example
        * const result = await Image.quality(base64Image, 80);
    */
    quality: (base64: string, quality: number) => Promise<{ data: string, size: string, quality: number, dimensions: { width: number, height: number } }>,

    /*
        * Resizes the image to the specified sizes.
        * @param base64 - The base64 encoded image string.
        * @param sizes - An array of sizes to resize the image to.
        * @example
        * const result = await Image.resize(base64Image, [100, 200]);
    */
    resize: (base64: string, sizes: Array<number>) => Promise<{ data: string, size: string, dimensions: { width: number, height: number } }>,

    /*
        * Flips the image in a specified direction.
        * @param base64 - The base64 encoded image string.
        * @param direction - The direction to flip the image (horizontal or vertical).
        * @example
        * const result = await Image.flip(base64Image, 'horizontal');
    */
    flip: (base64: string, direction: string) => Promise<{ data: string, size: string, dimensions: { width: number, height: number } }>,

    /*
        * Rotates the image by a specified angle.
        * @param base64 - The base64 encoded image string.
        * @param angle - The angle to rotate the image (e.g., '90deg', '180deg').
        * @example
        * const result = await Image.rotate(base64Image, '90deg');
    */
    rotate: (base64: string, angle: string) => Promise<{ data: string, size: string, dimensions: { width: number, height: number } }>,

    /*
        * Converts a base64 encoded image to a File object.
        * @param base64 - The base64 encoded image string.
        * @param filename - The name of the file to create.
        * @example
        * const file = await Image.base64toFile(base64Image, 'image.png');
    */
    base64toFile: (base64: string, filename: string) => Promise<File>,

    /*
        * Converts a File object to a base64 encoded string.
        * @param file - The File object to convert.
        * @example
        * const base64 = await Image.fileToBase64(file);
    */
    fileToBase64: (file: File) => Promise<string>,
}

export default Image