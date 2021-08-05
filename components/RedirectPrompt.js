export default function RedirectPrompt({ message }) {
  return (
    <div className="flex flex-col mt-32 items-center justify-center">
      <p className="text-3xl font-medium mb-10">{message}</p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none"
      >
        Return Home
      </a>
    </div>
  );
}
