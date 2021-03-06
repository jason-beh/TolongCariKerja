export default function RedirectPrompt({ message }) {
  return (
    <div className="flex flex-col mt-32 items-center justify-center">
      <p className="text-3xl font-medium mb-10 text-center">{message}</p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-700 hover:bg-sky-800 focus:outline-none"
      >
        Return to Home
      </a>
    </div>
  );
}
