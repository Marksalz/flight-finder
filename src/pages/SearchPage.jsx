export default function SearchPage() {
  return (
    <>
      <h1>Search flights</h1>
      <p>Use the form below to search for flights (placeholder).</p>
      <div className="search-placeholder">
        <label>
          From: <input placeholder="Origin airport code" />
        </label>
        <label>
          To: <input placeholder="Destination airport code" />
        </label>
      </div>
    </>
  );
}
