export default function ImagePicker() {
  return (
    <>
      {/* Single Image Picker */}
      <h2>Single Image File Picker</h2>
      <input type="file" accept="image/*" />
      {/* Multiple Image Picker */}
      <h2>Multiple Image File Picker</h2>
      <input type="file" accept="image/*" multiple />
      {/* Single Pdf Picker */}
      <h2>Single Pdf File Picker</h2>
      <input type="file" accept="application/pdf" />
      {/* Multiple Pdf Picker */}
      <h2>Multiple Pdf File Picker</h2>
      <input type="file" accept="application/pdf" multiple />
      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`accept=image/*,application/pdf`}</i>
      </h2>
      <input type="file" accept="image/*,application/pdf" multiple />
      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`without accept attribute`}</i>
      </h2>
      <input type="file" multiple />
    </>
  );
}
