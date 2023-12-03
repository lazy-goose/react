async function imageToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', () => reject(reader.error));
    reader.addEventListener('loadend', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
}

export default imageToBase64;
