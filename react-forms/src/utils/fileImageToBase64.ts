async function fileImageToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', () => reject(reader.error));
    reader.addEventListener('loadend', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
}

export default fileImageToBase64;
